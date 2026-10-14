import { memo } from "react";
import { Card, CardContent, Typography, Box, Chip, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArticleIcon from "@mui/icons-material/Article";

import "./PostCard.css";

function PostCard({ post, onEdit, onDelete }) {
  return (
    <Card elevation={0} className="post-card">
      <CardContent className="post-card__content">
        <Box className="post-card__header">
          <Chip
            icon={<ArticleIcon className="post-card__chip-icon" />}
            label={`#${post.id}`}
            size="small"
            className="post-card__chip"
          />
          <Box className="post-card__actions">
            <Tooltip title="Edit post">
              <IconButton
                color="primary"
                size="small"
                onClick={() => onEdit(post)}
                aria-label={`Edit post ${post.id}`}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete post">
              <IconButton
                className="post-card__delete-button"
                size="small"
                onClick={() => onDelete(post)}
                aria-label={`Delete post ${post.id}`}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Typography variant="subtitle1" className="post-card__title">
          {post.title}
        </Typography>

        <Typography variant="body2" className="post-card__description">
          {post.body}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default memo(PostCard);