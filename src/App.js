import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function App() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3001/login';
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        justifyContent: 'center',
      }}
    >
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login with SAML
      </Button>
    </Box>
  );
}

export default App;
