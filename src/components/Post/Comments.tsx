import { TPost } from "#/@types/posts";
import CONSTANTS from "#/constants/constants";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  comments: TPost["comments"];
}

const { NUMBER_OF_COMMENTS } = CONSTANTS;

const Comments: FC<Props> = ({ comments }) => {
  const [commentsState, setCommentsState] = useState(
    comments.slice(-NUMBER_OF_COMMENTS)
  );

  function viewAllComments() {
    setCommentsState(comments);
  }

  const ShowMoreButton = () => (
    <button
      className="underline text-gray-500 ml-4 self-start"
      onClick={() => viewAllComments()}
      type="button"
    >
      View all {comments.length} comments
    </button>
  );

  useEffect(() => {
    setCommentsState(comments.slice(-NUMBER_OF_COMMENTS));
  }, [comments]);

  return (
    <ul className="flex flex-col gap-2 mt-4 text-sm">
      {comments.length > commentsState.length && (
        <li>
          <ShowMoreButton />
        </li>
      )}
      {commentsState.map((comment, i) => (
        <li key={i}>
          <p>
            <Link to={`/profile/${comment.author}`} className="font-bold">
              {comment.author}
            </Link>{" "}
            <span>{comment.comment}</span>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default Comments;
