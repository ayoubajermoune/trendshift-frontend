import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleOpen = (post = null) => {
    if (post) {
      setEditPost(post);
      setFormData({ title: post.title, content: post.content });
    } else {
      setEditPost(null);
      setFormData({ title: '', content: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditPost(null);
    setFormData({ title: '', content: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editPost) {
        await axios.patch(
          `http://localhost:5000/api/posts/${editPost._id}`,
          formData,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      } else {
        await axios.post(
          'http://localhost:5000/api/posts',
          formData,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      }
      handleClose();
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Button variant="contained" onClick={() => handleOpen()}>
          Create New Post
        </Button>
      </Grid>

      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item xs={12} key={post._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {post.content}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleOpen(post)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(post._id)} color="error">
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editPost ? 'Edit Post' : 'Create New Post'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="content"
              label="Content"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={formData.content}
              onChange={handleChange}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editPost ? 'Save' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
