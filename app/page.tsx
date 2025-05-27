"use client";

import { PostList } from "@/components/posts/post-list";
import { getPosts } from "@/lib/api";
import { Post } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchAllPosts() {
      const apiPosts = await getPosts(1); // API posts

      const local = localStorage.getItem("myPosts");
      const myPosts: Post[] = local ? JSON.parse(local) : [];

      setPosts([...myPosts, ...apiPosts]); // My posts on top
    }

    fetchAllPosts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
        <p className="text-muted-foreground">
          Browse through the latest posts from our community
        </p>
      </div>

      <PostList initialPosts={posts} />
    </div>
  );
}
