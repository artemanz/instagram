import { TComment, TPost } from "#/@types/posts";
import AuthContext from "#/contexts/AuthContext";
import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  KeyboardEvent,
  RefObject,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import addComment from "./api/addComment";

interface Props {
  inputRef: RefObject<HTMLTextAreaElement>;
  post: TPost;
  setComments: Dispatch<SetStateAction<TComment[]>>;
}

const CommentInput: FC<Props> = ({ inputRef, post, setComments }) => {
  const { user } = useContext(AuthContext);
  const submitButton = useRef<HTMLButtonElement>(null);
  const [commentText, setCommentText] = useState("");

  function handleSubmit(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key.toLowerCase() == "enter") submitButton.current?.click();
  }

  function submitComment(e: FormEvent) {
    e.preventDefault();
    if (inputRef.current?.value) {
      addComment(user!.user_name, post, commentText);
      setComments((prev) => [
        ...prev,
        { author: user!.user_name, comment: commentText },
      ]);
      setCommentText("");
    }
  }

  function changeHandler(e: ChangeEvent<HTMLTextAreaElement>) {
    setCommentText(e.target.value);
    e.target.style.height = 0 + "px";
    e.target.style.height = e.target.scrollHeight + "px";
    setCommentText(e.target.value.replaceAll(/\n/g, ""));
  }

  return (
    <form
      className="mt-4 w-full flex gap-4 border-t border-t-gray-300 px-4 py-4"
      onSubmit={submitComment}
    >
      <textarea
        className="flex-1 text-sm rounded-md resize-none"
        rows={1}
        placeholder="Comment..."
        value={commentText}
        ref={inputRef}
        onChange={changeHandler}
        onKeyDown={handleSubmit}
      />
      <button
        disabled={commentText.length == 0}
        ref={submitButton}
        className="AppThinButton"
        type="submit"
      >
        Post
      </button>
    </form>
  );
};

export default CommentInput;
