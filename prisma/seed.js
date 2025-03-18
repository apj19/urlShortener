const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // await prisma.urlshortener.createMany({
  //   data: [
  //     { longurl: "https://www.google.com/", shorturl: "testg" },
  //     { longurl: "https://www.facebook.com/", shorturl: "testfb" },
  //     { longurl: "https://www.facebook.comsaf/", shorturl: "deletecode" },
  //   ],
  // });

     await  prisma.users.createMany({
      data:[
        {email:"default@gmail.com",name:"default",api_key:"testapikeysdfhsgsg"},
        {email:"default1@gmail.com",name:"default1",api_key:"testapikey2sdfhsgsg"},
        {email:"apjcr@gmail.com",name:"APJCR",api_key:"testapikeyapjcr"}
      ]
     })

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