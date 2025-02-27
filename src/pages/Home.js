import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  TextField,
  Avatar,
  IconButton,
} from '@mui/material';
import { Favorite, Share, Comment } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleLike = async (postId) => {
    if (!user) return;
    try {
      await axios.post(`http://localhost:5000/api/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (postId) => {
    if (!user || !comment.trim()) return;
    try {
      await axios.post(`http://localhost:5000/api/comments/${postId}`, 
        { content: comment },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
      );
      setComment('');
      setSelectedPost(null);
      fetchPosts();
    } catch (error) {
      console.error('Error commenting:', error);
    }
  };

  const handleShare = (post) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content,
        url: window.location.href,
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to TrendShift
      </Typography>
      
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item xs={12} key={post._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {post.content}
                </Typography>
                
                {post.comments.map((comment) => (
                  <Box key={comment._id} sx={{ mt: 2, display: 'flex', alignItems: 'start', gap: 2 }}>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {comment.author.username[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">
                        {comment.author.username}
                      </Typography>
                      <Typography variant="body2">
                        {comment.content}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
              
              <CardActions>
                <IconButton onClick={() => handleLike(post._id)} color={post.likes.includes(user?._id) ? 'primary' : 'default'}>
                  <Favorite />
                </IconButton>
                <IconButton onClick={() => setSelectedPost(post._id)}>
                  <Comment />
                </IconButton>
                <IconButton onClick={() => handleShare(post)}>
                  <Share />
                </IconButton>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  {post.likes.length} likes
                </Typography>
              </CardActions>

              {selectedPost === post._id && (
                <Box sx={{ p: 2 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    sx={{ mb: 1 }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => handleComment(post._id)}
                    disabled={!comment.trim()}
                  >
                    Post Comment
                  </Button>
                </Box>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
