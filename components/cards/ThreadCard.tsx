import Image from "next/image";
import Link from "next/link";

import { formatDateString, formatThreadContent } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThread";

import Comment from "@/components/forms/Comment";
import { twMerge } from "tailwind-merge";
import Avatar from "../shared/Avatar";
import BlockUser from "../forms/BlockUser";
import { ThreadStatus } from "@/lib/models/thread.model";

interface Props {
  id: string;
  currentUserId: string;
  currentUserObjectId: string;
  parentId: string | null;
  content: string;
  askerId: string | null;
  author: {
    name: string;
    image: string;
    id: string;
    username: string;
  };
  createdAt: string;
  comments: {
    author: {
      image: string;
      id: string;
    };
  }[];
  isComment?: boolean;
  replyVisible?: boolean;
  firstReplyContent?: string;
  summaryContent?: boolean;
  viewMode?: "thread" | "feed";
  userType?: "owner" | "asker" | "replier";
  threadStatus?: ThreadStatus;
}

function ThreadCard({
  id,
  currentUserId,
  currentUserObjectId,
  parentId,
  content,
  author,
  createdAt,
  comments,
  isComment,
  replyVisible,
  firstReplyContent,
  summaryContent = false,
  viewMode = "thread",
  userType = "owner",
  askerId,
  threadStatus,
}: Props) {
  function getAuthorName() {
    switch (userType) {
      case "owner":
        return author.name;
      case "replier":
        return "Anonymous";
      case "asker":
        return "Questioner";

      default:
        break;
    }
  }

  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Avatar variant={userType} author={author} className="relative" />

            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            {userType === "owner" ? (
              <Link href={`/@${author.username}`} className="w-fit">
                <h4 className="cursor-pointer text-base-semibold text-light-1">
                  {getAuthorName()}
                </h4>
              </Link>
            ) : (
              <div className="w-fit">
                <h4 className="text-base-semibold text-light-1">
                  {getAuthorName()}
                </h4>
              </div>
            )}
            <span className=" text-subtle-semibold text-light-3/50">
              {formatDateString(createdAt)}
            </span>

            <div
              className={twMerge(
                "mt-2 text-body1-semibold text-light-2",
                viewMode === "feed" &&
                  "pl-2  text-body1-bold text-light-2 border-l-4 border-primary-500 "
              )}
            >
              {summaryContent ? formatThreadContent(content, 500) : content}
            </div>
            {!isComment && firstReplyContent && (
              <p className="mt-4 inline-flex gap-1 text-small-regular text-light-2">
                {summaryContent
                  ? formatThreadContent(firstReplyContent, 500)
                  : firstReplyContent}
              </p>
            )}

            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className="flex flex-row items-center justify-between">
                <div className="flex gap-3.5">
                  <Image
                    src="/assets/heart-gray.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                  <Image
                    src="/assets/share.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </div>

                <BlockUser
                  blockingUserId={
                    threadStatus === ThreadStatus.Pending ? askerId! : author.id
                  }
                  userId={currentUserId}
                  userObjectId={currentUserObjectId}
                />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      {!isComment && comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          <Link href={`/thread/${id}`}>
            <p className="mt-1 text-subtle-medium text-primary-500">
              {comments.length} repl
              {comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}

      {replyVisible && (
        <Comment
          threadId={id}
          currentUserImg={author.image}
          currentUserId={JSON.stringify(currentUserId)}
          placeholder="Answer..."
        />
      )}
    </article>
  );
}

export default ThreadCard;
