import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    image: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, hasRole } = useAuth();

  // Redirect if not admin
  React.useEffect(() => {
    if (!hasRole('admin')) {
      navigate('/');
    }
  }, [hasRole, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/posts`, 
        formData,
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Handle successful post creation
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Post creation failed');
    }
  };

  return (
    <Container maxWidth="md">
      <Paper 
        elevation={3} 
        sx={{ 
          marginTop: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          padding: 3 
        }}
      >
        <Typography component="h1" variant="h5">
          Create New Post
        </Typography>
        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          noValidate 
          sx={{ mt: 1, width: '100%' }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Post Title"
            name="title"
            autoFocus
            value={formData.title}
            onChange={handleChange}
            inputProps={{ maxLength: 100 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            id="content"
            label="Post Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            inputProps={{ maxLength: 5000 }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value="general">General</MenuItem>
              <MenuItem value="news">News</MenuItem>
              <MenuItem value="announcement">Announcement</MenuItem>
              <MenuItem value="trending">Trending</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            fullWidth
            id="image"
            label="Image URL (Optional)"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Post
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreatePost;
