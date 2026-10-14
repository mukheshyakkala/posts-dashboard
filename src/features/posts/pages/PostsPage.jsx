import { useCallback, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import usePosts from "../hooks/usePosts";
import { useDebouncedValue } from "../../../shared/hooks/useDebouncedValue";
import PostsGrid from "../components/PostsGrid";
import PostFormDialog from "../components/PostFormDialog";
import Header from "../../../shared/components/Header";
import Footer from "../../../shared/components/Footer"; // Imported Footer Component
import "./PostPage.css";

export default function PostsPage() {
  const {
    posts,
    loading,
    error,
    addPost,
    updatePost,
    deletePost,
    retry,
  } = usePosts();

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [notification, setNotification] = useState("");

  const debouncedSearch = useDebouncedValue(search, 300);

  const filteredPosts = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    if (!query) return posts;

    return posts.filter(
      (post) =>
        post.title?.toLowerCase().includes(query) ||
        post.body?.toLowerCase().includes(query)
    );
  }, [posts, debouncedSearch]);

  const handleAdd = useCallback(() => {
    setEditingPost(null);
    setDialogOpen(true);
  }, []);

  const handleEdit = useCallback((post) => {
    setEditingPost(post);
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    setEditingPost(null);
  }, []);

  const handleDialogSubmit = useCallback(
    async (formData) => {
      try {
        if (editingPost) {
          await updatePost(editingPost.id, formData);
          setNotification("Post updated successfully.");
        } else {
          await addPost(formData);
          setNotification("Post created successfully.");
        }

        handleCloseDialog();
      } catch (err) {
        setNotification(
          editingPost
            ? "Unable to update post."
            : "Unable to create post."
        );
      }
    },
    [editingPost, updatePost, addPost, handleCloseDialog]
  );

  const handleFormSubmit = async (postData) => {
  console.log("editingPost,postData",)
  if (editingPost) {
    await updatePost(editingPost.id, postData);
  } else {
    await addPost(postData);
  }
}

  const handleDelete = useCallback(
    async (id) => {
      try {
        await deletePost(id);
        setNotification("Post deleted successfully.");
      } catch (err) {
        setNotification("Unable to delete post.");
      }
    },
    [deletePost]
  );

  const handleGridError = useCallback((message) => {
    setNotification(message || "Something went wrong.");
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Box className="posts-page__content" sx={{ flex: 1, pb: 6 }}>
        <Container maxWidth="xl" className="posts-page__container">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            className="posts-page__header"
          >
            <Box>
              <Typography variant="h4" className="posts-page__title">
                Posts Management
              </Typography>

              <Typography className="posts-page__subtitle">
                Manage, filter, and publish your content.
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAdd}
              className="posts-page__add-button"
            >
              Add New Post
            </Button>
          </Stack>

          <TextField
            fullWidth
            size="small"
            placeholder="Search by title or description"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="posts-page__search"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        color: "var(--color-text-muted, #64748b)",
                        fontSize: 25,
                      }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />

          {error && (
            <Alert
              severity="error"
              className="posts-page__error"
              action={
                <Button color="inherit" onClick={retry}>
                  Retry
                </Button>
              }
            >
              {error}
            </Alert>
          )}

          <Box className="posts-page__grid">
            <PostsGrid
              rows={filteredPosts}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onError={handleGridError}
            />
          </Box>
        </Container>

        <PostFormDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          onSubmit={handleDialogSubmit}
          initialPost={editingPost}
          editingPost={editingPost}
        />

        <Snackbar
          open={Boolean(notification)}
          autoHideDuration={3000}
          onClose={() => setNotification("")}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Alert
            severity={
              notification.toLowerCase().includes("unable") ||
              notification.toLowerCase().includes("error")
                ? "error"
                : "success"
            }
            onClose={() => setNotification("")}
          >
            {notification}
          </Alert>
        </Snackbar>
      </Box>

      {/* Footer placed at the bottom */}
      <Footer />
    </Box>
  );
}