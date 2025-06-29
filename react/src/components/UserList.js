import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Divider } from '@mui/material';

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ maxWidth: '300px', margin: 'auto', padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Online Users
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, backgroundColor: '#fafafa', height: '60vh', overflowY: 'auto' }}>
        <List>
          {users.map((user) => (
            <ListItem key={user._id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: '#1976d2' }}>{user.username.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.username} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default UserList;
