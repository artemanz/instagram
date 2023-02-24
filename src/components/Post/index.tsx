import { TPost } from "#/@types/posts";
import { FC, useRef, useState } from "react";
import Actions from "./Actions";
import Author from "./Author";
import Comments from "./Comments";
import { getTimeAgo } from "#/functions/dateConverter";
import CommentInput from "./CommentInput";
import CONSTANTS from "#/constants/constants";

interface Props {
  post: TPost;
}

const Post: FC<Props> = ({ post }) => {
  const commentInput = useRef<HTMLTextAreaElement>(null);
  const [comments, setComments] = useState(post.comments);

  function handleFocus() {
    commentInput.current?.focus();
  }

  return (
    <article
      className={
        "rounded-xl overflow-hidden bg-white flex flex-col items-center border border-gray-300 mb-8" +
        ` max-w-[calc(${CONSTANTS.PHOTO_HEIGHT}*4/5)]`
      }
    >
      <Author author={post.author} />
      <img
        className={"aspect-[4/5]" + ` max-h-[${CONSTANTS.PHOTO_HEIGHT}]`}
        loading="lazy"
        src={post.image}
        alt={post.caption}
      />
      <div className="w-full">
        <div className="px-4">
          <Actions
            post={post}
            comments={comments}
            handleInputFocus={handleFocus}
          />
          {post.caption && (
            <p className="pl-4">
              <span className="font-bold">{post.author.user_name} </span>
              {post.caption}
            </p>
          )}
          <Comments comments={comments} />
          <time className="block mt-4 text-xs text-gray-500 uppercase">
            {getTimeAgo(post.date_created)}
          </time>
        </div>
        <CommentInput
          inputRef={commentInput}
          post={post}
          setComments={setComments}
        />
      </div>
    </article>
  );
};

export default Post;
