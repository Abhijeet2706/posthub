"use client";

import { PostList } from "@/components/posts/post-list";
import { PostSkeletonList } from "@/components/posts/post-skeleton";
import { getPosts } from "@/lib/api";
import { Post } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<Post[] | null>(null); // null = loading

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const apiPosts = await getPosts(1);
        setPosts(apiPosts);
      } catch (err) {
        console.error("Failed to fetch posts", err);
        setPosts([]);
      }
    }

    fetchAllPosts();
  }, []);

  if (posts === null) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
          <p className="text-muted-foreground">
            Browse through the latest posts from our community
          </p>
        </div>

        {/* You can replace this with a <SkeletonCard /> list */}
        <PostSkeletonList />
      </div>
    );
  }

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
