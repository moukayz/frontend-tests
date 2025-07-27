import { PrismaClient, Prisma } from "../generated/prisma";
const prisma = new PrismaClient();

const comments = [
  {
    id: 1,
    content:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    createdAt: "1 month ago",
    score: 12,
    user: {
      image: "/images/avatars/image-amyrobson.png",
      username: "amyrobson",
    },
  },
  {
    id: 2,
    content:
      "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    createdAt: "2 weeks ago",
    score: 5,
    user: {
      image: "/images/avatars/image-maxblagun.png",
      username: "maxblagun",
    },
  },

  {
    id: 3,
    content:
      "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
    createdAt: "1 week ago",
    score: 4,
    replyingTo: "maxblagun",
    rootCommentId: 2,
    user: {
      image: "/images/avatars/image-ramsesmiron.png",
      username: "ramsesmiron",
    },
  },
  {
    id: 4,
    content:
      "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
    createdAt: "2 days ago",
    score: 2,
    replyingTo: "ramsesmiron",
    rootCommentId: 2,
    user: {
      image: "/images/avatars/image-juliusomo.png",
      username: "juliusomo",
    },
  },
];

// Each item contains the comment plus the author's info
const seedComments: (Prisma.CommentCreateInput & {
  user: { username: string; image: string };
})[] = comments;

async function main() {
  // wrap everything in one transaction for speed & atomicity
  await prisma.$transaction(
    seedComments.map((c) =>
      prisma.comment.create({
        data: {
          //   id: c.id,
          createdAt: c.createdAt,
          content: c.content,
          score: c.score ?? 0,
          replyingTo: c.replyingTo ?? null,
          rootCommentId: c.rootCommentId ?? null,

          // 🔑  The magic: create‑or‑connect the author
          user: {
            connectOrCreate: {
              where: { username: c.user.username }, // look‑up key
              create: {
                // only if not found
                username: c.user.username,
                image: c.user.image,
              },
            },
          },
        },
      })
    )
  );

  console.log(`🌱 Seeded ${seedComments.length} comments + users`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
