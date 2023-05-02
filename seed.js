const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: "Alice",
      posts: {
        create: [
          { title: "Hello World", content: "This is my first post" },
          { title: "Second Post", content: "Another day, another post" },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      name: "Bob",
      posts: {
        create: [
          { title: "My First Post", content: "Excited to start blogging!" },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
