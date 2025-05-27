import { getPost } from "@/lib/api";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PostDetail } from "@/components/posts/post-detail";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const id = parseInt(params.id);
  
  if (isNaN(id)) {
    notFound();
  }
  
  try {
    const post = await getPost(id);
    
    return (
      <div className="space-y-6">
        <Breadcrumb
          items={[
            { label: "Posts", href: "/" },
            { label: post.title, href: `/posts/${post.id}`, active: true },
          ]}
        />
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Post Details</h1>
          <p className="text-muted-foreground">
            View the complete post
          </p>
        </div>
        
        <PostDetail post={post} />
      </div>
    );
  } catch (error) {
    notFound();
  }
}