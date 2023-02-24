import { TPost } from "#/@types/posts";
import AuthContext from "#/contexts/AuthContext";
import { FC, useContext, useState } from "react";
import { HeartIcon, ChatBubbleOvalLeftEllipsisIcon } from "#icons/outline";
import addLike from "./api/addLike";

interface Props {
  post: TPost;
  comments: TPost["comments"];
  handleInputFocus: () => void;
}

const iconStyle = `w-8 h-8`;

const Actions: FC<Props> = ({ post, comments, handleInputFocus }) => {
  const { user } = useContext(AuthContext);

  const [toggleLiked, setToggleLiked] = useState(
    post.likes.includes(user!.user_name)
  );
  const [likes, setLikes] = useState(post.likes.length);

  async function handleToggleLiked() {
    setToggleLiked((liked) => !liked);
    if (!toggleLiked) setLikes((likes) => likes + 1);
    else setLikes((likes) => likes - 1);
    addLike(user!.user_name, post.id, !toggleLiked);
  }

  return (
    <div className="mt-4">
      <div className="flex items-center gap-6 mb-2 text-sm">
        <button
          className="flex flex-col gap-1"
          type="button"
          onClick={handleToggleLiked}
        >
          <HeartIcon
            className={`${iconStyle} ${
              toggleLiked ? "fill-red-500 stroke-red-500 animation-ping" : ""
            }`}
          />
          <span className="font-bold space-x-4">{likes} likes</span>
        </button>

        <button
          className="flex flex-col gap-1"
          type="button"
          onClick={() => handleInputFocus()}
        >
          <ChatBubbleOvalLeftEllipsisIcon className={iconStyle} />
          <span className="font-bold space-x-4">
            {comments.length} comments
          </span>
        </button>
      </div>
    </div>
  );
};

export default Actions;
