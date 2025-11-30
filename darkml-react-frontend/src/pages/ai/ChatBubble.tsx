import React from 'react';
import { Box, Typography, Paper, Stack, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

interface ChatBubbleProps {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ role, content }) => {
  const theme = useTheme();
  const isUser = role === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 1.5,
        px: 0.5,
      }}
    >
      <Stack
        spacing={0.5}
        alignItems={isUser ? 'flex-end' : 'flex-start'}
        maxWidth="80%"
      >
        {/* LABEL */}
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            px: 0.5,
          }}
        >
          {isUser ? 'You' : 'DarkML'}
        </Typography>

        {/* BUBBLE */}
        <Paper
          elevation={0}
          sx={{
            px: 1.75,
            py: 1.3,
            maxWidth: '100%',
            borderRadius: isUser
              ? '20px 4px 20px 20px'
              : '4px 20px 20px 20px',
            border: `1px solid ${theme.palette.divider}`,
            background: isUser
              ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
              : theme.palette.background.paper,
            color: isUser
              ? theme.palette.primary.contrastText
              : theme.palette.text.primary,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* ASSISTANT TINT OVERLAY (subtle, theme-safe) */}
          {!isUser && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                opacity: 0.05,
                pointerEvents: 'none',
                background: alpha(theme.palette.primary.light, 0.45),
              }}
            />
          )}

          {/* MESSAGE TEXT */}
          <Typography
            variant="body2"
            sx={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              lineHeight: 1.5,
              position: 'relative',
              zIndex: 2,
            }}
          >
            {content}
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
};

export default ChatBubble;
