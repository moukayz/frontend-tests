import { prisma } from "@/app/lib/prisma";
import Home from "./home";
import { RawComment, RawUser } from "./types";

export default async function HomePage() {
  const comments = await prisma.comment.findMany({
    include: {
      user: true,
    },
  });

  const currentUser: RawUser = {
    image: "/images/avatars/image-juliusomo.png",
    username: "juliusomo",
  };

  const rawComments = comments.map(
    ({ username, ...rest }) => rest as RawComment
  );
  return <Home rawComments={rawComments} rawCurrentUser={currentUser} />;
}
