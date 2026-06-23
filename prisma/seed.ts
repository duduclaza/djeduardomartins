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

  const tracks = [
    {
      title: "Queen of the Sound",
      slug: "queen-of-the-sound",
      genre: "Tribal House",
      source: "SOUNDCLOUD" as const,
      soundcloudUrl:
        "https://soundcloud.com/djeduardomartinsoficial/queen-of-the-sound-dj-eduardo",
    },
    {
      title: "Extravaganza (Original Mix)",
      slug: "extravaganza-original-mix",
      genre: "Tribal House",
      source: "SOUNDCLOUD" as const,
      soundcloudUrl:
        "https://soundcloud.com/djeduardomartinsoficial/extravaganza-original-mix-dj",
    },
    {
      title: "Fashionista (Original Mix)",
      slug: "fashionista-original-mix",
      genre: "Tribal House",
      source: "SOUNDCLOUD" as const,
      soundcloudUrl:
        "https://soundcloud.com/djeduardomartinsoficial/fashionista-original-mix-dj",
    },
    {
      title: "Abracadabra (Lady Gaga - Remix Sax)",
      slug: "abracadabra-lady-gaga-remix-sax",
      genre: "Remix",
      source: "SOUNDCLOUD" as const,
      soundcloudUrl:
        "https://soundcloud.com/djeduardomartinsoficial/abracadabra-lady-gaga-dj",
    },
    {
      title:
        "Alone (Offer Nissim feat. Maya Simantov - Tommy Love feat. Dj Eduardo Martins)",
      slug: "alone-offer-nissim-tommy-love",
      genre: "Remix",
      source: "SOUNDCLOUD" as const,
      soundcloudUrl:
        "https://soundcloud.com/djeduardomartinsoficial/offer-nissim-feat-maya",
    },
  ];

  for (const track of tracks) {
    await prisma.track.upsert({
      where: { slug: track.slug },
      update: track,
      create: track,
    });
  }
  console.log(`${tracks.length} faixas do SoundCloud sincronizadas.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
