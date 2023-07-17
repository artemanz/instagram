import { TPost } from "#/@types/posts";
import AuthContext from "#/contexts/AuthContext";
import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  ReducerAction,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import Popup from "reactjs-popup";
import { PhotoIcon } from "#icons/solid";
import { TrashIcon } from "#icons/outline";
import addNewPostToFirebase from "#/api/addNewPostToFirebase";

interface Props {
  open: boolean;
  setOpen: Dispatch<boolean>;
}

const CreatePostPopup: FC<Props> = ({ open, setOpen }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  function reducer(
    state: Omit<TPost, "id">,
    action: { field: string; payload: any }
  ): Omit<TPost, "id"> {
    switch (action.field) {
      case "image":
        return { ...state, image: action.payload };
      case "caption":
        return { ...state, caption: action.payload };
      default:
        return { ...state };
    }
  }
  const a = new Date();

  const initialState: Omit<TPost, "id"> = {
    author: user!,
    caption: "",
    comments: [],
    likes: [],
    date_created: Date.now(),
    image: "",
  };

  const [formData, dispatch] = useReducer(reducer, initialState);

  function onChangePhotoHandler(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files?.[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onload = (re) =>
        dispatch({ field: "image", payload: re.target?.result || "" });
    }
  }

  async function onSubmitHandler(e: FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    await addNewPostToFirebase(formData as any);
    setLoading(false);
    setOpen(false);
  }

  const ImageInput = () => (
    <label className="p-2 bg-gray-200 border border-gray-400 rounded-lg cursor-pointer">
      <div className="border-2 border-dashed border-inherit flex flex-col justify-center items-center w-72 h-40 rounded-lg">
        <PhotoIcon width={80} className=" text-gray-400" />
        <p className="text-sm text-gray-400">Upload photo</p>
      </div>
      <input
        onChange={onChangePhotoHandler}
        accept="image/png, image/jpeg"
        className="hidden"
        type="file"
      />
    </label>
  );

  return (
    <Popup open={open} onClose={() => setOpen(false)}>
      <form
        onSubmit={onSubmitHandler}
        className="bg-white flex flex-col p-8 rounded-lg gap-5"
      >
        {!formData.image ? (
          <ImageInput />
        ) : (
          <div className="relative">
            <img className="max-w-xs" src={formData.image} />
            <button
              className="absolute top-2 right-2 bg-white rounded-full p-1"
              onClick={() => dispatch({ field: "image", payload: "" })}
            >
              <TrashIcon width={24} className="text-black" />
            </button>
          </div>
        )}

        <input
          type="text"
          placeholder="Enter a caption..."
          value={formData.caption}
          onChange={(e) =>
            dispatch({ field: "caption", payload: e.target.value })
          }
        />

        <input className="AppButton py-2" type="submit" value="Add post" />
      </form>
    </Popup>
  );
};

export default CreatePostPopup;
