import React from 'react';
import { Box, TextField, IconButton, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { alpha } from '@mui/material/styles';

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const theme = useTheme();
  const [message, setMessage] = React.useState('');

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setMessage('');
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const disabled = !message.trim();

  return (
    <Box sx={{ mt: 1.5 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 1,
          borderRadius: 999,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          px: 1.75,
          py: 0.9,
          boxShadow: theme.shadows[1],
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={4}
          variant="standard"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
          InputProps={{
            disableUnderline: true,
            sx: {
              color: 'text.primary',
              '&::placeholder': {
                color: 'text.secondary',
                opacity: 0.8,
              },
              '& textarea': {
                fontSize: 14,
                lineHeight: 1.6,
              },
            },
          }}
          sx={{
            '& .MuiInputBase-root': {
              p: 0,
            },
          }}
        />

        <IconButton
          onClick={handleSend}
          disabled={disabled}
          sx={{
            ml: 0.5,
            borderRadius: 999,
            p: 1.1,
            background: disabled
              ? alpha(theme.palette.primary.main, 0.08)
              : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            color: disabled
              ? theme.palette.text.disabled
              : theme.palette.primary.contrastText,
            boxShadow: disabled ? 'none' : theme.shadows[3],
            transition: 'all .15s ease',
            '&:hover': {
              background: disabled
                ? alpha(theme.palette.primary.main, 0.08)
                : `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
              boxShadow: disabled ? 'none' : theme.shadows[4],
            },
          }}
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatInput;
