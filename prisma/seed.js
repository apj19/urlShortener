const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.urlShortener.createMany({
    data: [
      { longUrl: "https://www.google.com/", ShortUrl: "testg" },
      { longUrl: "https://www.facebook.com/", ShortUrl: "testfb" },
      { longUrl: "https://www.facebook.comsaf/", ShortUrl: "deletecode" },
    ],
  });

  console.log("✅ Seed data added!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });