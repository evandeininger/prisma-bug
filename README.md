# prisma-bug

all you need to do is clone locally and run:
```
npm run repro
```
to reproduce the issue, this should output:

```
use prisma and @prisma/client 4.10.0
********4.10.0********
Query: 
    SELECT * FROM Post
    WHERE title IN (@P1,@P2)
  
Params: ["Hello World","My First Post"]
Duration: 8ms
***************
Posts with specified titles: [
  {
    id: 1,
    title: 'Hello World',
    content: 'This is my first post',
    authorId: 1
  },
  {
    id: 3,
    title: 'My First Post',
    content: 'Excited to start blogging!',
    authorId: 2
  }
]
✅ Success!
use prisma and @prisma/client 4.11.0
********4.11.0********
Query: 
    SELECT * FROM Post
    WHERE title IN (@P1)
  
Params: [{"values":["Hello World","My First Post"],"strings":["",",",""]}]
Duration: 21ms
***************
Posts with specified titles: []
❌ Failed
```
