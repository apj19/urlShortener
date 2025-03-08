const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.urlshortener.createMany({
    data: [
      { longurl: "https://www.google.com/", shorturl: "testg" },
      { longurl: "https://www.facebook.com/", shorturl: "testfb" },
      { longurl: "https://www.facebook.comsaf/", shorturl: "deletecode" },
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