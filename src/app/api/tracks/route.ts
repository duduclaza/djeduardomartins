import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

export async function POST(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const form = await req.formData();
  const title = form.get("title")?.toString().trim();
  const genre = form.get("genre")?.toString().trim();
  const description = form.get("description")?.toString().trim() || null;
  const isFree = form.get("isFree") === "true";
  const priceCents = isFree
    ? 0
    : Math.round(Number(form.get("price") || 0) * 100);
  const audioFile = form.get("audio") as File | null;
  const coverFile = form.get("cover") as File | null;

  if (!title || !genre || !audioFile || audioFile.size === 0) {
    return NextResponse.json(
      { error: "Título, gênero e arquivo de áudio são obrigatórios." },
      { status: 400 }
    );
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const baseSlug = slugify(title) || "faixa";
  let slug = baseSlug;
  let n = 1;
  while (await prisma.track.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${n++}`;
  }

  const audioExt = path.extname(audioFile.name) || ".mp3";
  const audioFileName = `${slug}-${Date.now()}${audioExt}`;
  await fs.writeFile(
    path.join(uploadsDir, audioFileName),
    Buffer.from(await audioFile.arrayBuffer())
  );

  let coverUrl = "/images/covers/placeholder-1.svg";
  if (coverFile && coverFile.size > 0) {
    const coverExt = path.extname(coverFile.name) || ".jpg";
    const coverFileName = `${slug}-cover-${Date.now()}${coverExt}`;
    await fs.writeFile(
      path.join(uploadsDir, coverFileName),
      Buffer.from(await coverFile.arrayBuffer())
    );
    coverUrl = `/uploads/${coverFileName}`;
  }

  const track = await prisma.track.create({
    data: {
      title,
      slug,
      genre,
      description,
      coverUrl,
      audioUrl: `/uploads/${audioFileName}`,
      isFree,
      priceCents,
    },
  });

  return NextResponse.json({ ok: true, track });
}
