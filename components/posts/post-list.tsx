"use client";

import { useToast } from "@/hooks/use-toast";
import { getPosts } from "@/lib/api";
import { Post } from "@/lib/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { PostCard } from "./post-card";
import { PostSkeletonList } from "./post-skeleton";

export function PostList({ initialPosts = [] }: { initialPosts?: Post[] }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [hasLoadedLocal, setHasLoadedLocal] = useState(false); // 👈 Track local load
  const observer = useRef<IntersectionObserver | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!hasLoadedLocal) {
      const local = localStorage.getItem("myPosts");
      const myPosts: Post[] = local ? JSON.parse(local) : [];
      setPosts(myPosts); // 👈 Only set localStorage posts once
      setHasLoadedLocal(true);
    }
  }, [hasLoadedLocal]);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newPosts = await getPosts(page);

      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [page, toast]);

  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchPosts]
  );

  return (
    <div className="space-y-8">
      {posts.length === 0 && loading ? (
        <PostSkeletonList />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => {
              if (posts.length === index + 1) {
                return (
                  <div ref={lastPostRef} key={post.id + index}>
                    <PostCard post={post} />
                  </div>
                );
              } else {
                return <PostCard key={post.id} post={post} />;
              }
            })}
          </div>

          {loading && <PostSkeletonList />}

          {!hasMore && posts.length > 0 && (
            <p className="text-center text-muted-foreground py-4">
              No more posts to load
            </p>
          )}
        </>
      )}
    </div>
  );
}
