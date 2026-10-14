
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import "./PostFormDialog.css";

export default function PostFormDialog({
  open,
  onClose,
  onSubmit,
  editingPost,
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(editingPost);

  // Populate fields whenever the dialog opens or the selected post changes.
  useEffect(() => {
    if (open) {
      setTitle(editingPost?.title ?? "");
      setBody(editingPost?.body ?? "");
      setError("");
    }
  }, [open, editingPost]);

  const handleClose = () => {
    if (saving) return;

    setTitle("");
    setBody("");
    setError("");
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !body.trim()) {
      setError("Title and description are required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const postData = {
        title: title.trim(),
        body: body.trim(),
        userId: editingPost?.userId ?? 1,
      };

      // Pass the post ID when editing.
      if (isEditing) {
        await onSubmit({
          ...postData,
          id: editingPost.id,
        });
      } else {
        await onSubmit(postData);
      }

      setTitle("");
      setBody("");
      onClose();
    } catch (err) {
      setError(
        err?.message ||
          `Unable to ${isEditing ? "update" : "create"} post.`
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {isEditing ? "Edit Post" : "Create Post"}
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            margin="normal"
            disabled={saving}
          />

          <TextField
            label="Description"
            fullWidth
            required
            multiline
            minRows={4}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            margin="normal"
            disabled={saving}
          />

          {error && (
            <p className="post-form-dialog__error" role="alert">
              {error}
            </p>
          )}
        </DialogContent>

        <DialogActions className="post-form-dialog__actions">
          <Button
            onClick={handleClose}
            disabled={saving}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : isEditing
                ? "Update Post"
                : "Create Post"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}