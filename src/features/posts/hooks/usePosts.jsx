import { useState, useEffect, useCallback, useRef } from "react";
import postsApi from "../services/postsApi";

export default function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const controllerRef = useRef(null);

  // Fetch posts
  const loadPosts = useCallback(async () => {
    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      setLoading(true);
      setError("");

      const data = await postsApi.getAll(controller.signal);

      if (!controller.signal.aborted) {
        setPosts(data);
      }
    } catch (err) {
      if (
        err.name !== "CanceledError" &&
        err.name !== "AbortError"
      ) {
        setError(err.message || "Failed to load posts");
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadPosts();

    return () => {
      controllerRef.current?.abort();
    };
  }, [loadPosts]);

  // Create post
  const addPost = async (post) => {
    const createdPost = await postsApi.create(post);

    // Generate a unique local ID
    const newPost = {
      ...createdPost,
      ...post,
      id: crypto.randomUUID(),
      isLocal: true,
    };

    setPosts((prev) => [newPost, ...prev]);

    return newPost;
  };

  // Update post
  const updatePost = async (id, updatedPost) => {
    const existingPost = posts.find((post) => post.id === id);

    if (!existingPost) {
      throw new Error("Post not found");
    }

    let savedPost;

    if (existingPost.isLocal) {
      // Newly created post: update locally
      savedPost = {
        ...existingPost,
        ...updatedPost,
      };
    } else {
      // Existing post: call API
      const response = await postsApi.update(id, updatedPost);

      savedPost = {
        ...existingPost,
        ...response,
        ...updatedPost,
      };
    }

    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? savedPost : post
      )
    );

    return savedPost;
  };

  // Delete post
  const deletePost = async (id) => {
    const existingPost = posts.find((post) => post.id === id);

    if (!existingPost) {
      throw new Error("Post not found");
    }

    // Call API only for existing server posts
    if (!existingPost.isLocal) {
      await postsApi.remove(id);
    }

    setPosts((prev) =>
      prev.filter((post) => post.id !== id)
    );
  };

  const retry = () => loadPosts();

  return {
    posts,
    loading,
    error,
    addPost,
    updatePost,
    deletePost,
    retry,
  };
} 