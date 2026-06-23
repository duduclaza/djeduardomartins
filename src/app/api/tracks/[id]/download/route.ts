import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect(new URL("/membros/login", req.url));
  }

  const { id } = await params;
  const track = await prisma.track.findUnique({ where: { id } });

  if (!track || !track.published) {
    return NextResponse.json({ error: "Faixa não encontrada." }, { status: 404 });
  }

  if (!track.isFree) {
    return NextResponse.json(
      { error: "Esta faixa ainda não está disponível para compra." },
      { status: 403 }
    );
  }

  if (track.source !== "UPLOAD" || !track.audioUrl) {
    return NextResponse.json(
      { error: "Esta faixa só está disponível para ouvir no SoundCloud." },
      { status: 400 }
    );
  }

  await prisma.download.upsert({
    where: { userId_trackId: { userId: session.user.id, trackId: track.id } },
    update: {},
    create: { userId: session.user.id, trackId: track.id },
  });

  const filePath = path.join(process.cwd(), "public", track.audioUrl);
  const file = await fs.readFile(filePath);
  const filename = `${track.slug}${path.extname(track.audioUrl)}`;

  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
