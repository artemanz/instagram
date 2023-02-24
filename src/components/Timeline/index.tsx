import { TPost } from "#/@types/posts";
import AuthContext from "#/contexts/AuthContext";

import { FC, useContext, useEffect, useState } from "react";
import Post from "../Post";
import Suggestions from "../Suggestions";
import Loading from "../UI/Loading";
import countPosts from "./api/countPosts";
import getPosts from "./api/getPosts";

import InfiniteScroll from "react-infinite-scroller";

interface Props {}

const Timeline: FC<Props> = () => {
  const { user } = useContext(AuthContext);
  if (!user) return null;
  const [posts, setPosts] = useState<TPost[]>([]);
  const [postsServerCount, setPostsServerCount] = useState(0);

  const infiniteScroll = async () => {
    const newPosts = await getPosts();
    setPosts((prev) => [...prev, ...newPosts]);
  };

  useEffect(() => {
    if (!posts.length && user) {
      getPosts().then((p) => setPosts([...p]));
      countPosts().then((c) => setPostsServerCount(c));
    }
  }, []);

  function createPost(post: TPost) {
    return <Post post={post} key={post.id} />;
  }

  if (!posts.length) return <Loading />;

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={infiniteScroll}
      hasMore={posts.length < postsServerCount}
      loader={<Loading />}
    >
      <div className="p-6 bg-white shadow-md rounded-xl lg:hidden mb-8">
        <Suggestions />
      </div>
      {posts.map(createPost)}
    </InfiniteScroll>
  );
};

export default Timeline;
