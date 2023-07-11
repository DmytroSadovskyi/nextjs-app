import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Next App",
};

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("Unable to fetch posts");
  }

  return response.json();
};

const Blog = async () => {
  const posts = await fetchPosts();

  return (
    <>
      <h1>Blog</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Blog;
