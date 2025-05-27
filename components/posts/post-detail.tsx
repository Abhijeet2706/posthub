import { Post } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PostDetailProps {
  post: Post;
}

export function PostDetail({ post }: PostDetailProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>User ID: {post.userId}</span>
          <span>•</span>
          <span>Post ID: {post.id}</span>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <p className="leading-7 whitespace-pre-line">{post.body}</p>
      </CardContent>
    </Card>
  );
}