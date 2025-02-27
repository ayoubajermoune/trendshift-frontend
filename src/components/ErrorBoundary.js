import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("خطأ غير متوقع:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm">
          <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            height="100vh"
            textAlign="center"
          >
            <Typography variant="h4" color="error" gutterBottom>
              عذرًا، حدث خطأ غير متوقع
            </Typography>
            <Typography variant="body1" paragraph>
              يبدو أن هناك مشكلة في التطبيق. حاول تحديث الصفحة أو العودة للصفحة الرئيسية.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => window.location.href = '/'}
            >
              العودة للصفحة الرئيسية
            </Button>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
