"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./lib/prisma";
import { RawComment } from "./types";

export async function createComment(comment: RawComment) {
  if (comment.rootCommentId) {
    if (!comment.replyingTo) {
      throw new Error("Reply comment must have a replyingTo");
    }

    const rootComment = await prisma.comment.findUnique({
      where: { id: comment.rootCommentId },
    });

    const replyingToComment = await prisma.user.findUnique({
      where: { username: comment.replyingTo },
    });

    if (!rootComment || !replyingToComment) {
      throw new Error("Root comment or replyingTo comment not found");
    }
  }

  const newComment = await prisma.comment.create({
    data: {
      content: comment.content,
      createdAt: new Date().toISOString(),
      score: 0,
      user: { connect: { username: comment.user.username } },
      rootCommentId: comment.rootCommentId ?? null,
      replyingTo: comment.replyingTo ?? null,
    },
  });

  revalidatePath("/");
}

export async function updateComment({
  id,
  content,
}: {
  id: number;
  content: string;
}) {
  const updatedComment = await prisma.comment.update({
    where: { id },
    data: { content },
  });
  revalidatePath("/");
}

export async function deleteComment(commentId: number) {
  await prisma.comment.delete({
    where: { id: commentId },
  });
  revalidatePath("/");
}

export async function updateCommentScore(commentId: number, score: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await prisma.comment.update({
    where: { id: commentId },
    data: { score },
  });
  revalidatePath("/");
}
