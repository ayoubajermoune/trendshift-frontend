import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

function Loading() {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="100vh"
    >
      <CircularProgress color="primary" size={60} />
      <Typography variant="body1" style={{ marginTop: 16 }}>
        جارٍ التحميل...
      </Typography>
    </Box>
  );
}

export default Loading;
