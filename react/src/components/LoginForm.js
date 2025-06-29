import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Both username and password are required');
      return;
    }

    const endpoint = isRegistering ? '/api/register' : '/api/login';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isRegistering) {
          setError('');
          setIsRegistering(false);
          setPassword('');
          alert('Registration successful! Please log in.');
        } else {
          onLoginSuccess(data.userId, data.username);
        }
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
      console.error('Error during authentication:', err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: '400px',
        margin: 'auto',
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#ffffff',
        marginTop: '10vh'
      }}
    >
      <Typography variant="h5" align="center">
        {isRegistering ? 'Register' : 'Login'}
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {isRegistering ? 'Register' : 'Login'}
      </Button>
      <Button
        variant="text"
        color="secondary"
        onClick={() => {
          setIsRegistering(!isRegistering);
          setError('');
        }}
        fullWidth
      >
        {isRegistering ? 'Already have an account? Login' : 'No account? Register'}
      </Button>
    </Box>
  );
};

export default LoginForm;
