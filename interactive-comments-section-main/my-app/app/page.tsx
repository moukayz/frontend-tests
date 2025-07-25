"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type UserImage = {
  png: string;
  webp: string;
};

interface User {
  image: UserImage;
  username: string;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
}

interface ReplyComment extends Comment {
  replyingTo: string;
}

interface RootComment extends Comment {
  replies: ReplyComment[];
}

interface CommentsData {
  currentUser: User;
  comments: RootComment[];
}

export default function Home() {
  const [commentsData, setCommentsData] = useState<CommentsData | null>(null);
  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch("/data.json");
      const data = await response.json();
      setCommentsData(data);
    };
    fetchComments();
  }, []);

  if (!commentsData) {
    return <div>Loading...</div>;
  }

  const comments = commentsData.comments;
  const currentUser = commentsData.currentUser;
  const testComment = comments[0];

  return (
    <div className="w-full min-h-screen bg-grey-50 px-4 py-8 flex flex-col gap-4">
      {comments.map((comment) => (
        <RootCommentCard
          key={comment.id}
          rootComment={comment}
          currentUser={currentUser}
        />
      ))}

      <div className="bg-white rounded-lg p-4 grid grid-cols-2 grid-rows-[1fr_auto] gap-4">
        <textarea
          className="col-span-2 border border-grey-100 rounded-lg p-4 resize-none"
          placeholder="Add a comment"
          rows={3}
        ></textarea>

        <Avatar user={currentUser} className="justify-self-start self-center" />

        <button className="justify-self-end self-center bg-purple-600 text-white rounded-lg px-6 py-2 font-medium">
          SEND
        </button>
      </div>
    </div>
  );
}

type CommentCardProps = {
  comment: Comment;
  currentUser: User;
  replyTo?: string;
};

type ActionButtonProps = {
  icon: string;
  label: string;
  onClick?: () => void;
  className?: string;
};

const ActionButton = ({
  icon,
  label,
  onClick,
  className,
}: ActionButtonProps) => {
  return (
    <div
      className={`flex items-center gap-2 text-purple-600 ${className}`}
      onClick={onClick}
    >
      <img src={icon} alt={label} className="w-3 h-3" />
      <span className=" font-bold">{label}</span>
    </div>
  );
};

const ReplyButton = () => (
  <ActionButton icon="/images/icon-reply.svg" label="Reply" />
);

const DeleteButton = () => (
  <ActionButton
    icon="/images/icon-delete.svg"
    label="Delete"
    className="text-red-500"
  />
);

const EditButton = () => (
  <ActionButton icon="/images/icon-edit.svg" label="Edit" />
);

const VoteButton = () => (
  <ActionButton icon="/images/icon-plus.svg" label="Vote" />
);

function CommentCard({ comment, currentUser, replyTo }: CommentCardProps) {
  return (
    <div className="rounded-lg bg-white p-4 grid grid-cols-2 gap-4">
      {/* Comment Header */}
      <div className="col-span-2 flex gap-4 items-center justify-start font-base">
        <Avatar user={comment.user} />
        <span className="text-black ">{comment.user.username}</span>
        {comment.user.username === currentUser.username && (
          <span className="bg-purple-600 rounded-sm px-1 text-white text-sm">
            you
          </span>
        )}
        <span className="text-grey-500">{comment.createdAt}</span>
      </div>

      {/* Comment Content */}
      <div className="col-span-2 text-grey-500 inline-block">
        {replyTo && (
          <span className="text-purple-600 font-medium">@{replyTo}</span>
        )}
        &nbsp;
        {comment.content}
      </div>

      {/* Comment Footer */}
      <div className="justify-self-start bg-grey-100 rounded-lg flex gap-4 px-4 py-2 text-sm  items-center">
        <img src="/images/icon-plus.svg" alt="plus" className="aspect-auto" />
        <span className="text-purple-600 font-medium">{comment.score}</span>
        <img src="/images/icon-minus.svg" alt="minus" />
      </div>

      <div className="justify-self-end self-center flex gap-4">
        {comment.user.username !== currentUser.username ? (
          <ReplyButton />
        ) : (
          <>
            <DeleteButton />
            <EditButton />
          </>
        )}
      </div>
    </div>
  );
}

type RootCommentCardProps = {
  rootComment: RootComment;
  currentUser: User;
};

function Avatar({ user, className }: { user: User; className?: string }) {
  return (
    <Image
      src={user.image.png}
      alt={user.username}
      width={32}
      height={32}
      className={`w-8 h-8 rounded-full ${className}`}
    />
  );
}

function RootCommentCard({ rootComment, currentUser }: RootCommentCardProps) {
  return (
    <div>
      <CommentCard comment={rootComment} currentUser={currentUser} />

      {rootComment.replies.length > 0 && (
        <div className="mt-4 pl-4 border-l-2 border-grey-100 flex flex-col gap-4">
          {rootComment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              replyTo={reply.replyingTo}
            />
          ))}
        </div>
      )}
    </div>
  );
}
