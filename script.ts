import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      EmaidId: "sharoqouethouq@gmail.com",
      UserName: "sharooque",
      Password: "admin123",
    },
  });
  console.log(user);
  console.log("Hpoo");
}

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
