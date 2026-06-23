import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  const track = await prisma.track.update({
    where: { id },
    data: {
      published: typeof body.published === "boolean" ? body.published : undefined,
      isFree: typeof body.isFree === "boolean" ? body.isFree : undefined,
    },
  });

  return NextResponse.json({ ok: true, track });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await params;
  const track = await prisma.track.findUnique({ where: { id } });

  if (track) {
    await prisma.download.deleteMany({ where: { trackId: id } });
    await prisma.track.delete({ where: { id } });

    for (const url of [track.audioUrl, track.coverUrl]) {
      if (url?.startsWith("/uploads/")) {
        await fs.unlink(path.join(process.cwd(), "public", url)).catch(() => {});
      }
    }
  }

  return NextResponse.json({ ok: true });
}
