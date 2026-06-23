import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME ?? "Webmaster";

  if (!email || !password) {
    throw new Error(
      "Defina ADMIN_EMAIL e ADMIN_PASSWORD no .env antes de rodar o seed."
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: "ADMIN", name },
    create: { email, passwordHash, role: "ADMIN", name },
  });

  console.log(`Webmaster pronto: ${admin.email}`);

  const trackCount = await prisma.track.count();
  if (trackCount === 0) {
    await prisma.track.createMany({
      data: [
        {
          title: "Pandora (Tribal Mix)",
          slug: "pandora-tribal-mix",
          genre: "Tribal House",
          description:
            "Faixa autoral de tribal house com pegada de festa, ideal para pista cheia.",
          coverUrl: "/images/covers/placeholder-1.svg",
          audioUrl: "/audio/placeholder-track.wav",
          isFree: true,
          priceCents: 0,
        },
        {
          title: "Pride Anthem",
          slug: "pride-anthem",
          genre: "Pop House",
          description: "Hino para a comunidade, energia pop com base house.",
          coverUrl: "/images/covers/placeholder-2.svg",
          audioUrl: "/audio/placeholder-track-2.wav",
          isFree: true,
          priceCents: 0,
        },
      ],
    });
    console.log("Faixas de exemplo criadas.");
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
