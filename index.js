// run `node index.js` in the terminal
const prismaclient = require("@prisma/client")
const { Prisma, PrismaClient } = prismaclient

const logging = {
  log: [
    {emit: 'event', level: 'query'}
  ]
}
const prismaClient = new PrismaClient(logging);

const queryEvent = (e) => {
  console.log(`********${Prisma.prismaVersion.client}********`);
  console.log('Query: ' + e.query);
  console.log('Params: ' + e.params);
  console.log('Duration: ' + e.duration + 'ms');
  console.log('***************');
};

prismaClient.$on('query', queryEvent)

async function main() {
  const arrayOfStrings = ["Hello World", "My First Post"];

  const posts = await prismaClient.$queryRaw`
    SELECT * FROM Post
    WHERE title IN (${Prisma.join(arrayOfStrings)})
  `;

  console.log("Posts with specified titles:", posts);
  console.log(posts.length ? "✅ Success!" : "❌ Failed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
