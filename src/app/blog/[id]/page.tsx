import React from "react";
import { Metadata } from "next";
interface Props {
  params: {
    id: string;
  };
}

const fetchPosts = async (id: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  return response.json();
};

export const generateMetadata = async ({
  params: { id },
}: Props): Promise<Metadata> => {
  const post = await fetchPosts(id);
  return {
    title: post.title,
  };
};

const Post = async ({ params: { id } }: Props) => {
  const post = await fetchPosts(id);

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
};

export default Post;
