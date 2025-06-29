import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, IconButton, MenuItem, Menu } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import ErrorBoundary from './ErrorBoundary';
import LoginForm from './components/LoginForm';
import ChatRoom from './components/ChatRoom';
import UserList from './components/UserList';
import './App.css';

function App() {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLoginSuccess = (id, name) => {
    setUserId(id);
    setUsername(name);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUserId(null);
    setUsername('');
    setAnchorEl(null);
  };

  return (
    <ErrorBoundary>
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          {userId && (
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Group Chat App
                </Typography>
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>
              </Toolbar>
            </AppBar>
          )}
          <Routes>
            <Route
              path="/login"
              element={userId ? <Navigate to="/chat" /> : <LoginForm onLoginSuccess={handleLoginSuccess} />}
            />
            <Route
              path="/chat"
              element={userId ? (
                <Box sx={{ display: 'flex', padding: 2, marginTop: '10px' }}>
                  <Box sx={{ flexGrow: 1, marginRight: 2 }}>
                    <ChatRoom userId={userId} username={username} />
                  </Box>
                  <Box>
                    <UserList />
                  </Box>
                </Box>
              ) : (
                <Navigate to="/login" />
              )}
            />
            <Route path="*" element={<Navigate to={userId ? "/chat" : "/login"} />} />
          </Routes>
        </Box>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
