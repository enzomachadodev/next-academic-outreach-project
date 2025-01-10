"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { apiInstance } from "@/lib/api";

import { PostData } from "../lib/types";
import { PostCard } from "./post-card";

export const ForYouFeed = () => {
  const {
    data: posts,
    isPending,
    isError,
  } = useQuery<PostData[]>({
    queryKey: ["post-feed", "for-you"],
    queryFn: apiInstance.get("/api/posts/for-you").json<PostData[]>,
  });

  if (isPending) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (isError) {
    return <p>Ocorreu um erro ao carregar as postagens.</p>;
  }

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};
