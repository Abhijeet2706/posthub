"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "@/lib/types";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const router = useRouter();

  const handleClick = () => {
    const local = localStorage.getItem("myPosts");
    const myPosts: Post[] = local ? JSON.parse(local) : [];
    const isLocal = myPosts.some((p) => p.id === post.id);

    if (isLocal) {
      router.push(`/posts/local/${post.id}`);
    } else {
      router.push(`/posts/${post.id}`);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={handleClick}
      className="cursor-pointer"
    >
      <Card className="h-full overflow-hidden border border-border hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="line-clamp-2 text-lg font-semibold">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <p className="text-muted-foreground line-clamp-3">{post.body}</p>
        </CardContent>
        <CardFooter className="pt-0 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>User ID: {post.userId}</span>
            <span>•</span>
            <span>Post ID: {post.id}</span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
