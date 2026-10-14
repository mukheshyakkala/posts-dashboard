import { memo, useCallback, useMemo, useState } from "react";
import {
  Alert,
  Box,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import ConfirmDialog from "../../../shared/components/ConfirmDialog";
import PostCard from "./PostCard";
import "./PostsGrid.css";

function PostsGrid({
  rows,
  loading,
  onEdit,
  onDelete,
  onError,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleOpenDelete = useCallback((post) => {
    setSelectedPost(post);
    setConfirmOpen(true);
  }, []);

  const handleCloseDelete = useCallback(() => {
    if (deleting) return;
    setConfirmOpen(false);
    setSelectedPost(null);
  }, [deleting]);

  const handleConfirmDelete = useCallback(async () => {
    if (!selectedPost) return;

    setDeleting(true);

    try {
      await onDelete(selectedPost.id);
      setConfirmOpen(false);
      setSelectedPost(null);
    } catch (error) {
      onError?.("Unable to delete post.");
    } finally {
      setDeleting(false);
    }
  }, [selectedPost, onDelete, onError]);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 80 },
      { field: "title", headerName: "Title", flex: 1, minWidth: 200 },
      { field: "body", headerName: "Description", flex: 1.5, minWidth: 280 },
      {
        field: "actions",
        headerName: "Actions",
        width: 130,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <Tooltip title="Edit post">
              <IconButton
                color="primary"
                size="small"
                onClick={() => onEdit(params.row)}
                aria-label={`Edit post ${params.row.id}`}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete post">
              <IconButton
                className="posts-grid__delete-button"
                size="small"
                onClick={() => handleOpenDelete(params.row)}
                aria-label={`Delete post ${params.row.id}`}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    [onEdit, handleOpenDelete]
  );

  return (
    <Box className="posts-grid" sx={{ width: "100%" }}>
      {onError && !rows && (
        <Alert severity="error" sx={{ mb: 2 }}>Unable to load posts.</Alert>
      )}

      {isMobile ? (
        <Box className="posts-grid__mobile-list">
          {rows && rows.length > 0 ? (
            rows.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onEdit={onEdit}
                onDelete={handleOpenDelete}
              />
            ))
          ) : (
            <Typography variant="body2" className="posts-grid__empty">
              No posts available.
            </Typography>
          )}
        </Box>
      ) : (
        <DataGrid
          rows={rows || []}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.id}
          autoHeight
          pageSizeOptions={[5, 10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          disableRowSelectionOnClick
        />
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Post"
        message={`Are you sure you want to delete "${selectedPost?.title || "this post"}"?`}
        confirmText={deleting ? "Deleting..." : "Yes, Delete"}
        cancelText="Cancel"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onClose={handleCloseDelete}
      />
    </Box>
  );
}

export default memo(PostsGrid);