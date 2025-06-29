import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Divider } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

const ChatRoom = ({ userId, username }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data.reverse()); // Reverse to show latest at bottom
      } else {
        console.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMessage,
          userId: userId,
        }),
      });

      if (response.ok) {
        setNewMessage('');
        fetchMessages(); // Refresh messages
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '70vh', maxWidth: '800px', margin: 'auto', padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Chat Room - Welcome, {username}!
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2, border: '1px solid #e0e0e0', borderRadius: 1, backgroundColor: '#fafafa' }}>
        <List>
          {messages.map((msg) => (
            <ListItem key={msg._id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{msg.sender?.username?.charAt(0) || 'U'}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={msg.sender?.username || 'Unknown User'}
                secondary={msg.content}
                sx={{ backgroundColor: userId === msg.sender?._id ? '#e3f2fd' : '#ffffff', padding: 1, borderRadius: 1 }}
              />
            </ListItem>
          ))}
        </List>
        <div ref={messagesEndRef} />
      </Box>
      <Box sx={{ display: 'flex', marginTop: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          sx={{ marginRight: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatRoom;
