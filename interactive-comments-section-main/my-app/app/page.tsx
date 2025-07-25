"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function timeAgo(inputDate: Date | string) {
  const date = inputDate instanceof Date ? inputDate : new Date(inputDate);
  const now = Date.now();
  const secondsPast = Math.floor((now - date.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 365 * 24 * 60 * 60 },
    { label: "month", seconds: 30 * 24 * 60 * 60 },
    { label: "week", seconds: 7 * 24 * 60 * 60 },
    { label: "day", seconds: 24 * 60 * 60 },
    { label: "hour", seconds: 60 * 60 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const { label, seconds } of intervals) {
    const count = Math.floor(secondsPast / seconds);
    if (count >= 1) {
      return `${count} ${label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, callback]);
};

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
  rootCommentId: number;
}

interface RootComment extends Comment {
  replies: ReplyComment[];
}

interface CommentsData {
  currentUser: User;
  comments: RootComment[];
}

type FixedRootComment = Comment & {};
// type FixedReplyComment = ReplyComment & {
//   rootCommentId: number;
// };

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [commentList, setCommentList] = useState<
    Record<number, FixedRootComment | ReplyComment>
  >({});
  const lastIdRef = useRef(0);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch("/data.json");
      const data: CommentsData = await response.json();

      const comments = data.comments;
      const replies: ReplyComment[] = comments.flatMap((comment) =>
        comment.replies.map((reply) => ({
          ...reply,
          rootCommentId: comment.id,
        }))
      );
      const fixedComments: FixedRootComment[] = comments.map((comment) => ({
        ...comment,
        replies: null,
      }));
      setCommentList(
        [...fixedComments, ...replies].reduce(
          (acc: Record<number, FixedRootComment | ReplyComment>, comment) => {
            acc[comment.id] = comment;
            return acc;
          },
          {}
        )
      );
      setCurrentUser(data.currentUser);
      lastIdRef.current = comments.length + replies.length;
    };
    fetchComments();
  }, []);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const comments = Object.values(commentList).filter(
    (comment) => !("replyingTo" in comment)
  ) as FixedRootComment[];
  const replies = Object.values(commentList).filter(
    (comment) => "replyingTo" in comment
  ) as ReplyComment[];

  const handleScoreUpdate = (commentId: number, newScore: number) => {
    setCommentList((prev) => {
      const newComment = { ...prev[commentId], score: newScore };
      return { ...prev, [commentId]: newComment };
    });
  };

  const handlePublishComment = (comment: Comment) => {
    console.log("handlePublishComment", comment);

    const fixedComment: FixedRootComment = {
      ...comment,
      id: ++lastIdRef.current,
    };
    setCommentList((prev) => {
      return { ...prev, [fixedComment.id]: fixedComment };
    });
  };

  const handleReplyComment = (reply: ReplyComment, rootCommentId: number) => {
    const validReply = commentList[rootCommentId] !== undefined;
    if (!validReply) {
      console.warn("commentToReply not found", reply.replyingTo);
      return;
    }

    const fixedReply: ReplyComment = {
      ...reply,
      id: ++lastIdRef.current,
      rootCommentId,
    };
    setCommentList((prev) => {
      return {
        ...prev,
        [fixedReply.id]: fixedReply,
      };
    });
  };

  const handleCommentUpdate = (commentId: number, content: string) => {
    setCommentList((prev) => {
      const newComment = { ...prev[commentId], content };
      return { ...prev, [commentId]: newComment };
    });
  };

  const handleDeleteComment = (commentId: number) => {
    setCommentList((prev) => {
      const newCommentList = { ...prev };
      delete newCommentList[commentId];
      return newCommentList;
    });
  };

  console.log("comments", comments);
  console.log("replies", replies);
  return (
    <div className="w-full min-h-screen bg-grey-50 px-4 py-8 flex flex-col gap-4">
      {comments.map((comment) => (
        <RootCommentCard
          key={comment.id}
          rootComment={comment}
          currentUser={currentUser}
          replies={replies.filter(
            (reply) => reply.rootCommentId === comment.id
          )}
          onScoreUpdate={handleScoreUpdate}
          onCommentUpdate={handleCommentUpdate}
          onCommentDelete={handleDeleteComment}
          onReply={(reply) => handleReplyComment(reply, comment.id)}
        />
      ))}

      <PublishComment
        currentUser={currentUser}
        onPublish={handlePublishComment}
      />
    </div>
  );
}

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

const ReplyButton = ({ onClick }: { onClick: () => void }) => (
  <ActionButton icon="/images/icon-reply.svg" label="Reply" onClick={onClick} />
);

const DeleteButton = ({ onClick }: { onClick: () => void }) => (
  <ActionButton
    icon="/images/icon-delete.svg"
    label="Delete"
    onClick={onClick}
    className="text-red-500"
  />
);

const EditButton = ({ onClick }: { onClick: () => void }) => (
  <ActionButton icon="/images/icon-edit.svg" label="Edit" onClick={onClick} />
);

const VoteButton = () => (
  <ActionButton icon="/images/icon-plus.svg" label="Vote" />
);

type PublishCommentProps = {
  currentUser: User;
  isReply?: boolean;
  onPublish: (comment: Comment) => void;
};

function PublishComment({
  currentUser,
  onPublish,
  isReply = false,
}: PublishCommentProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handlePublish = () => {
    const commentText = textAreaRef.current?.value;
    if (!commentText) return;

    const newComment: Comment = {
      id: -1,
      content: commentText,
      createdAt: new Date().toISOString(),
      score: 0,
      user: currentUser,
    };

    onPublish(newComment);
    textAreaRef.current!.value = "";
  };
  return (
    <div className="bg-white rounded-lg p-4 grid grid-cols-2 grid-rows-[1fr_auto] gap-4">
      <textarea
        ref={textAreaRef}
        className="col-span-2 border border-grey-100 rounded-lg p-4 resize-none"
        placeholder="Add a comment"
        rows={3}
      ></textarea>

      <Avatar user={currentUser} className="justify-self-start self-center" />

      <button
        onClick={handlePublish}
        className="justify-self-end self-center bg-purple-600 text-white rounded-lg px-6 py-2 font-medium"
      >
        {isReply ? "REPLY" : "SEND"}
      </button>
    </div>
  );
}

function nomalizeCreateTime(createdAt: string) {
  const date = new Date(createdAt);
  if (isNaN(date.getTime())) {
    return createdAt;
  }

  return timeAgo(date);
}

type CommentContentProps = {
  content: string;
  replyTo?: string;
  isEditing: boolean;
  onUpdate: (content: string) => void;
};

function CommentContent({
  content,
  replyTo,
  isEditing,
  onUpdate,
}: CommentContentProps) {
  // const [editContent, setEditContent] = useState(content);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const textBlockHeight = useRef(0);

  useEffect(() => {
    if (textBlockRef.current) {
      const { width, height } = textBlockRef.current.getBoundingClientRect();
      textBlockHeight.current = height;
      console.log("textBlockHeight", textBlockHeight.current);
    }
  }, [isEditing]);

  if (isEditing) {
    return (
      <div className="flex flex-col gap-2">
        <textarea
          id="edit-content"
          ref={textAreaRef}
          // value={editContent}
          defaultValue={content}
          style={{ height: textBlockHeight.current + "px" }}
          className="border border-grey-100 box-content rounded-lg p-4 resize-none"
          // onChange={(e) => setEditContent(e.target.value)}
        ></textarea>
        <button
          onClick={() => {
            onUpdate(textAreaRef.current?.value ?? "");
          }}
          className="bg-purple-600 text-white rounded-lg px-6 py-2 font-medium"
        >
          UPDATE
        </button>
      </div>
    );
  }

  return (
    <div
      ref={textBlockRef}
      className=" text-grey-500 wrap-anywhere inline-block"
    >
      {replyTo && (
        <span className="text-purple-600 font-medium">@{replyTo}</span>
      )}
      &nbsp;
      {content}
    </div>
  );
}

type CommentCardProps = {
  comment: Comment;
  currentUser: User;
  replyTo?: string;
  onScoreUpdate: (commentId: number, newScore: number) => void;
  onCommentUpdate: (commentId: number, content: string) => void;
  onCommentDelete: (commentId: number) => void;
  onReply: (reply: ReplyComment) => void;
};

type OpState = "idle" | "reply" | "edit" | "delete";

function CommentCard({
  comment,
  currentUser,
  replyTo,
  onScoreUpdate,
  onCommentUpdate,
  onCommentDelete,
  onReply,
}: CommentCardProps) {
  const [opState, setOpState] = useState<OpState>("idle");
  const replySectionRef = useRef<HTMLDivElement>(null);
  useClickOutside(replySectionRef, () => setOpState("idle"));

  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-lg bg-white p-4 grid grid-cols-2 gap-4">
        {/* Comment Header */}
        <div className="col-span-2">
          <UserInfo
            user={comment.user}
            isCurrentUser={comment.user.username === currentUser.username}
            commentTime={comment.createdAt}
          />
        </div>

        {/* Comment Content */}
        <div className="col-span-2">
          <CommentContent
            content={comment.content}
            replyTo={replyTo}
            isEditing={opState === "edit"}
            onUpdate={(content) => {
              onCommentUpdate(comment.id, content);
              setOpState("idle");
            }}
          />
        </div>

        {/* Comment Footer */}
        <div className="justify-self-start">
          <VoteBlock
            onAdd={() => onScoreUpdate(comment.id, comment.score + 1)}
            onMinus={() => onScoreUpdate(comment.id, comment.score - 1)}
            score={comment.score}
          />
        </div>

        <div className="justify-self-end self-center ">
          <OperationBlock
            isCurrentUser={comment.user.username === currentUser.username}
            onReply={() => setOpState("reply")}
            onDelete={() => setOpState("delete")}
            onEdit={() => setOpState("edit")}
          />
        </div>
      </div>

      {opState === "reply" && (
        <div ref={replySectionRef}>
          <PublishComment
            currentUser={currentUser}
            onPublish={(reply) => {
              onReply({
                ...reply,
                replyingTo: comment.user.username,
                rootCommentId: -1,
              });
              setOpState("idle");
            }}
            isReply={true}
          />
        </div>
      )}

      {opState === "delete" && (
        <DeleteCommentModal
          onConfirm={() => {
            onCommentDelete(comment.id);
            setOpState("idle");
          }}
          onCancel={() => setOpState("idle")}
        />
      )}
    </div>
  );
}

type OperationBlockProps = {
  isCurrentUser: boolean;
  onReply: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

function OperationBlock({
  isCurrentUser,
  onReply,
  onDelete,
  onEdit,
}: OperationBlockProps) {
  return (
    <div className="flex gap-4">
      {isCurrentUser ? (
        <>
          <DeleteButton onClick={onDelete} />
          <EditButton onClick={onEdit} />
        </>
      ) : (
        <ReplyButton onClick={onReply} />
      )}
    </div>
  );
}

type VoteBlockProps = {
  onAdd: () => void;
  onMinus: () => void;
  score: number;
};

function VoteBlock({ onAdd, onMinus, score }: VoteBlockProps) {
  return (
    <div className="bg-grey-100 rounded-lg flex gap-4 px-4 py-2 text-sm  items-center">
      <img
        onClick={onAdd}
        src="/images/icon-plus.svg"
        alt="plus"
        className="aspect-auto"
      />
      <span className="text-purple-600 font-medium w-[3ch] text-center">
        {score}
      </span>
      <img onClick={onMinus} src="/images/icon-minus.svg" alt="minus" />
    </div>
  );
}

type UserInfoProps = {
  user: User;
  isCurrentUser: boolean;
  commentTime: string;
};
function UserInfo({ user, isCurrentUser, commentTime }: UserInfoProps) {
  return (
    <div className="flex gap-4 items-center justify-start font-base">
      <Avatar user={user} />
      <span className="text-black ">{user.username}</span>
      {isCurrentUser && (
        <span className="bg-purple-600 rounded-sm px-1 text-white text-sm">
          you
        </span>
      )}
      <span className="text-grey-500">{nomalizeCreateTime(commentTime)}</span>
    </div>
  );
}

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

type RootCommentCardProps = {
  rootComment: FixedRootComment;
  replies: ReplyComment[];
  currentUser: User;
  onScoreUpdate: (commentId: number, newScore: number) => void;
  onCommentUpdate: (commentId: number, content: string) => void;
  onCommentDelete: (commentId: number) => void;
  onReply: (reply: ReplyComment) => void;
};

function RootCommentCard({
  rootComment,
  replies,
  currentUser,
  onScoreUpdate,
  onCommentUpdate,
  onCommentDelete,
  onReply,
}: RootCommentCardProps) {
  return (
    <div>
      <CommentCard
        comment={rootComment}
        currentUser={currentUser}
        onScoreUpdate={onScoreUpdate}
        onCommentUpdate={onCommentUpdate}
        onCommentDelete={onCommentDelete}
        onReply={onReply}
      />

      {replies.length > 0 && (
        <div className="mt-4 pl-4 border-l-2 border-grey-100 flex flex-col gap-4">
          {replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              replyTo={reply.replyingTo}
              onScoreUpdate={onScoreUpdate}
              onCommentUpdate={onCommentUpdate}
              onCommentDelete={onCommentDelete}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

type DeleteCommentModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

function DeleteCommentModal({ onConfirm, onCancel }: DeleteCommentModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onCancel);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/30 p-4 flex justify-center items-center z-10 pointer-events-auto">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 flex flex-col gap-4"
      >
        <h2 className="text-lg font-medium">Delete comment</h2>
        <p className="text-grey-500">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="bg-grey-800/80 text-white rounded-lg px-6 py-4 font-medium"
          >
            NO, CANCEL
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500/80 text-white rounded-lg px-6 py-4 font-medium"
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
