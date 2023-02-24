import { TPost } from "#/@types/posts";
import { TFirebaseUser } from "#/@types/users";
import { FC, useEffect, useState } from "react";
import { getPosts } from "./api/getPosts";

interface Props {
  profile: TFirebaseUser;
}

const ProfilePosts: FC<Props> = ({ profile }) => {
  const [posts, setPosts] = useState<TPost[]>([]);

  function getPostsByUsername() {
    (async () => {
      setPosts(await getPosts(profile.user_name));
    })();
  }

  useEffect(getPostsByUsername, [profile]);

  function createPostCard(post: TPost) {
    console.log(post);

    return (
      <article key={post.id}>
        <button type="button" onClick={() => {}}>
          <img
            className="aspect-square object-cover"
            src={post.image}
            alt={post.caption}
          />
        </button>
      </article>
    );
  }

  return (
    <section className="grid grid-cols-3 gap-1">
      {posts.map(createPostCard)}
    </section>
  );
};

export default ProfilePosts;
