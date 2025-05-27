"use client";

import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PostDetail } from "@/components/posts/post-detail";
import { Post } from "@/lib/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LocalPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("myPosts");
    const myPosts: Post[] = saved ? JSON.parse(saved) : [];
    const found = myPosts.find((p) => p.id === parseInt(id as string));

    if (found) {
      setPost(found);
    }
  }, [id]);

  if (!post) {
    return <p className="text-muted-foreground">Post not found.</p>;
  }

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Posts", href: "/" },
          { label: post.title, href: `/posts/local/${post.id}`, active: true },
        ]}
      />

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Post Details</h1>
        <p className="text-muted-foreground">
          This is a post you created locally.
        </p>
      </div>

      <PostDetail post={post} />
    </div>
  );
}
