

import apiClient from "./apiClient";

const postsApi = {
  // GET: Fetch all posts
  getAll: async (signal) => {
    const response = await apiClient.get("/posts", { signal });
    return response.data;
  },

  // POST: Create a post
  create: async (post) => {
    const response = await apiClient.post("/posts", post);
    return response.data;
  },

  // PUT: Update a post
  update: async (id, post) => {
    const response = await apiClient.put(`/posts/${id}`, post);
    return response.data;
  },

  // DELETE: Delete a post
  remove: async (id) => {
    const response = await apiClient.delete(`/posts/${id}`);
    return response.data;
  },
};

export default postsApi;