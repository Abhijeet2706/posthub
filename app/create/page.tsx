import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PostForm } from "@/components/posts/post-form";

export default function CreatePostPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Posts", href: "/" },
          { label: "Create", href: "/create", active: true },
        ]}
      />
      
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create Post</h1>
        <p className="text-muted-foreground">
          Share your thoughts with our community
        </p>
      </div>
      
      <PostForm />
    </div>
  );
}