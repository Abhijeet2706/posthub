import { Post, PostFormValues } from "./types";

const API_URL = "https://jsonplaceholder.typicode.com";

export async function getPosts(page = 1, limit = 10): Promise<Post[]> {
  const start = (page - 1) * limit;
  const response = await fetch(`${API_URL}/posts?_start=${start}&_limit=${limit}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  
  return response.json();
}

export async function getPost(id: number): Promise<Post> {
  const response = await fetch(`${API_URL}/posts/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch post with id ${id}`);
  }
  
  return response.json();
}

export async function createPost(post: PostFormValues): Promise<Post> {
  // Simulate longer loading time for demo purposes
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  
  if (!response.ok) {
    throw new Error("Failed to create post");
  }
  
  return response.json();
}