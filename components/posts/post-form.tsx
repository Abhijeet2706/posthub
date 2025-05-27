"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createPost } from "@/lib/api";
import { Post, PostFormValues } from "@/lib/types";
import { postFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function PostForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      body: "",
      userId: 1, // Default user ID
    },
  });

  const launchConfetti = () => {
    const duration = 2000; // 2 seconds
    const interval = 250; // fire every 250ms
    const end = Date.now() + duration;

    const confettiInterval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(confettiInterval);
        return;
      }

      confetti({
        particleCount: 100,
        spread: 120,
        startVelocity: 30,
        angle: 90,
        gravity: 0.5,
        ticks: 200,
      });
    }, interval);
  };

  const onSubmit = async (data: PostFormValues) => {
    try {
      setIsSubmitting(true);

      const newPost = await createPost(data);

      // Save to localStorage
      const stored = localStorage.getItem("myPosts");
      const existing: Post[] = stored ? JSON.parse(stored) : [];
      localStorage.setItem("myPosts", JSON.stringify([newPost, ...existing]));

      toast({
        title: "Message sent 🎉 🎉 🎉",
        description: "Thanks for reaching out. I'll get back to you soon.",
        variant: "success",
      });

      launchConfetti();

      toast({
        title: "Post created 🎉 🎉 🎉",
        description: "Your post has been successfully created.",
        variant: "success",
      });

      // Navigate back to home after a short delay
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create Post</CardTitle>
        <CardDescription>
          Create a new post to share with the community
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter post title" {...field} />
                  </FormControl>
                  <FormDescription>
                    Create a descriptive title for your post
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your post content here..."
                      className="min-h-32 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The main content of your post
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-500 hover:bg-orange-600"
            >
              {isSubmitting && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isSubmitting ? "Creating..." : "Create Post"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
