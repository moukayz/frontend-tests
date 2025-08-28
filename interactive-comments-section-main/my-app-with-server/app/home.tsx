"use client";

import Image from "next/image";
import {
  startTransition,
  useEffect,
  useOptimistic,
  useRef,
  useState,
} from "react";
import { RawComment, RawUser } from "./types";
import {
  createComment,
  deleteComment,
  updateComment,
  updateCommentScore,
} from "./actions";

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

export default function Home({
  rawComments,
  rawCurrentUser,
}: {
  rawComments: RawComment[];
  rawCurrentUser: RawUser;
}) {
  console.log("rawComments", rawComments);
  const commentsMap = rawComments.reduce((acc, comment) => {
    acc[comment.id] = comment;
    return acc;
  }, {} as Record<number, RawComment>);

  console.log("commentsMap", commentsMap);

  const lastIdRef = useRef(0);

  useEffect(() => {}, []);

  const comments = Object.values(commentsMap).filter(
    (comment) => comment.rootCommentId === null
  );
  const replies = Object.values(commentsMap).filter(
    (comment) => comment.rootCommentId !== null
  );

  const handleScoreUpdate = (commentId: number, newScore: number) => {
    console.log("handleScoreUpdate", commentId, newScore);
    startTransition(async () => {
      await updateCommentScore(commentId, newScore);
    });
  };

  const handlePublishComment = (comment: RawComment) => {
    console.log("handlePublishComment", comment);

    startTransition(async () => {
      await createComment(comment);
    });
  };

  const handleReplyComment = (reply: RawComment, rootCommentId: number) => {
    console.log("handleReplyComment", reply, rootCommentId);
    startTransition(async () => {
      await createComment({ ...reply, rootCommentId });
    });
  };

  const handleCommentUpdate = (commentId: number, content: string) => {
    console.log("handleCommentUpdate", commentId, content);
    startTransition(async () => {
      await updateComment({ id: commentId, content });
    });
  };

  const handleDeleteComment = (commentId: number) => {
    console.log("handleDeleteComment", commentId);
    startTransition(async () => {
      await deleteComment(commentId);
    });
  };

  console.log("comments", comments);
  console.log("replies", replies);
  return (
    <div className="w-full md:max-w-3xl mx-auto min-h-screen bg-grey-50 px-4 py-8 md:py-20 flex flex-col gap-4 md:gap-6">
      {comments.map((comment) => (
        <RootCommentCard
          key={comment.id}
          rootComment={comment}
          currentUser={rawCurrentUser}
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
        currentUser={rawCurrentUser}
        onPublish={handlePublishComment}
      />
    </div>
  );
}

type ActionButtonProps = {
  icon: string;
  label?: string;
  onClick?: () => void;
  className?: string;
  useDefaultSize?: boolean;
};

const ActionButton = ({
  icon,
  label,
  onClick,
  useDefaultSize,
  className,
}: ActionButtonProps) => {
  return (
    <div
      className={`cursor-pointer hover:opacity-80 flex items-center gap-2 text-purple-600 font-bold  ${className}`}
      onClick={onClick}
    >
      <img
        src={icon}
        alt={label}
        className={`${useDefaultSize ? "" : "w-3 h-3"}`}
      />
      {label && <span className="">{label}</span>}
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
  currentUser: RawUser;
  isReply?: boolean;
  onPublish: (comment: RawComment) => void;
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

    const newComment: RawComment = {
      id: -1,
      content: commentText,
      createdAt: "",
      score: 0,
      user: currentUser,
    };

    onPublish(newComment);
    textAreaRef.current!.value = "";
  };
  return (
    <div
      className="card grid grid-cols-2 grid-rows-[1fr_auto] 
      md:grid-cols-[auto_1fr_auto] md:grid-rows-1 gap-4"
    >
      <textarea
        ref={textAreaRef}
        className="col-span-2 md:col-span-1 md:col-start-2 border border-grey-100 rounded-lg p-4 resize-none"
        placeholder="Add a comment"
        rows={3}
      ></textarea>

      <Avatar
        user={currentUser}
        className="justify-self-start self-center md:self-start md:col-start-1 md:row-start-1"
      />

      <button
        onClick={handlePublish}
        className="justify-self-end self-center md:col-start-3 md:self-start btn"
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
          defaultValue={content}
          style={{ height: textBlockHeight.current + "px" }}
          className="border border-grey-100 box-content rounded-lg p-4 resize-none"
        ></textarea>
        <button
          onClick={() => {
            onUpdate(textAreaRef.current?.value ?? "");
          }}
          className="btn md:w-fit md:self-end"
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
        <span className="text-purple-600 font-medium">@{replyTo}&nbsp;</span>
      )}
      {content}
    </div>
  );
}

type CommentCardProps = {
  comment: RawComment;
  currentUser: RawUser;
  replyTo?: string;
  onScoreUpdate: (commentId: number, newScore: number) => void;
  onCommentUpdate: (commentId: number, content: string) => void;
  onCommentDelete: (commentId: number) => void;
  onReply: (reply: RawComment) => void;
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
      <div
        className="card 
        grid grid-cols-2 gap-4 md:grid-cols-[auto_1fr_auto] md:grid-rows-[auto_1fr] md:gap-x-6 md:gap-y-4 "
      >
        {/* Comment Header */}
        <div className="col-span-2 md:col-span-1 md:col-start-2">
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
        <div className="justify-self-start md:row-span-2 md:row-start-1 md:self-start md:justify-self-end">
          <VoteBlock
            onAdd={() => onScoreUpdate(comment.id, comment.score + 1)}
            onMinus={() => onScoreUpdate(comment.id, comment.score - 1)}
            score={comment.score}
          />
        </div>

        <div className="justify-self-end self-center md:row-start-1 md:col-start-3">
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
    <div className="bg-grey-100 rounded-lg flex gap-4 px-4 py-2 md:px-2 md:py-4 text-sm  items-center md:flex-col">
      <ActionButton
        icon="/images/icon-plus.svg"
        onClick={onAdd}
        useDefaultSize={true}
      />
      <span className="text-purple-600 font-medium w-[3ch] text-center">
        {score}
      </span>
      <ActionButton
        icon="/images/icon-minus.svg"
        onClick={onMinus}
        useDefaultSize={true}
      />
    </div>
  );
}

type UserInfoProps = {
  user: RawUser;
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

function Avatar({ user, className }: { user: RawUser; className?: string }) {
  return (
    <Image
      src={user.image}
      alt={user.username}
      width={32}
      height={32}
      className={`w-8 h-8 rounded-full ${className}`}
    />
  );
}

type RootCommentCardProps = {
  rootComment: RawComment;
  replies: RawComment[];
  currentUser: RawUser;
  onScoreUpdate: (commentId: number, newScore: number) => void;
  onCommentUpdate: (commentId: number, content: string) => void;
  onCommentDelete: (commentId: number) => void;
  onReply: (reply: RawComment) => void;
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
        <div className="mt-4 md:ml-12 pl-4 md:pl-12 border-l-2 border-grey-100 flex flex-col gap-4">
          {replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              replyTo={reply.replyingTo!}
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
      <div ref={modalRef} className="card flex flex-col gap-4 md:max-w-sm">
        <h2 className="text-lg font-medium">Delete comment</h2>
        <p className="text-grey-500">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="flex justify-between">
          <button onClick={onCancel} className="modal-btn bg-grey-800/80">
            NO, CANCEL
          </button>
          <button onClick={onConfirm} className="modal-btn bg-red-500/80">
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
