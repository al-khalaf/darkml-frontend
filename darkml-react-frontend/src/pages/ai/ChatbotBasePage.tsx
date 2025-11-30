import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Stack,
  Chip,
  Divider,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import PageHeader from '../../components/common/PageHeader';
import { sendChatMessage } from '../../api/aiApi';
import { useAuth } from '../../hooks/useAuth';
import type { ChatMessage } from '../../types/models';

interface ChatbotBasePageProps {
  title: string;
  apiRole: string;
  enableTutorMode?: boolean;
}

const ChatbotBasePage: React.FC<ChatbotBasePageProps> = ({
  title,
  apiRole,
  enableTutorMode = false,
}) => {
  const theme = useTheme();
  const { user } = useAuth();

  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [tutorMode, setTutorMode] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);

  const handleSend = async (content: string) => {
    if (!content.trim() || isSending || !user) return;

    const newUserMessage: ChatMessage = { role: 'user', content };
    setMessages((prev) => [...prev, newUserMessage]);

    setIsSending(true);
    try {
      const res = await sendChatMessage(apiRole, {
        message: content,
        userId: user.id,
        role: user.role,
        extraContext: { tutorMode },
      });

      setMessages((prev) => [...prev, ...res.messages]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <PageHeader
        title={title}
        subtitle={
          apiRole === 'student'
            ? 'Ask questions, get explanations, and explore topics with DarkML.'
            : 'AI copilot for questions, workflows, and quick triage.'
        }
      />

      <Card variant="outlined">
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, p: 2.5 }}>
          {/* HEADER / TAGS / TUTOR MODE */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
          >
            <Stack spacing={0.25}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Conversation
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 420 }}>
                Messages are scoped to your role. AI responses may reflect analytics and context
                from DarkML.
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              flexWrap="wrap"
              justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
            >
              <Chip size="small" label={apiRole} variant="outlined" color="primary" />

              {user && (
                <Chip
                  size="small"
                  label={user.role}
                  variant="outlined"
                  sx={{ textTransform: 'capitalize' }}
                />
              )}

              {enableTutorMode && (
                <FormControlLabel
                  sx={{
                    ml: 0.5,
                    mr: 0,
                    '& .MuiTypography-root': { fontSize: 12 },
                  }}
                  control={
                    <Switch
                      size="small"
                      checked={tutorMode}
                      onChange={(e) => setTutorMode(e.target.checked)}
                    />
                  }
                  label="Tutor mode"
                />
              )}
            </Stack>
          </Stack>

          <Divider />

          {/* CHAT CONTAINER */}
          <Box
            sx={{
              position: 'relative',
              borderRadius: 2.5,
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.paper,
              height: { xs: 420, md: 480 },
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* MESSAGES */}
            <Box
              sx={{
                flex: 1,
                overflowY: 'auto',
                p: 2,
                pr: 2.5,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.25,
              }}
            >
              {messages.length === 0 && (
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: 'text.secondary',
                    px: 2,
                  }}
                >
                  <Typography variant="body2" sx={{ mb: 0.75 }}>
                    No messages yet.
                  </Typography>
                  <Typography variant="body2">
                    Start by asking a question or describing what you're working on.
                  </Typography>
                </Box>
              )}

              {messages.map((m, i) => (
                <ChatBubble key={i} role={m.role} content={m.content} />
              ))}
            </Box>

            {/* SENDING INDICATOR */}
            {isSending && (
              <Box
                sx={{
                  position: 'absolute',
                  right: 14,
                  bottom: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.25,
                  py: 0.6,
                  borderRadius: 999,
                  backgroundColor: alpha(theme.palette.background.paper, 0.9),
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.shadows[2],
                }}
              >
                <CircularProgress size={14} thickness={5} />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  DarkML is thinking…
                </Typography>
              </Box>
            )}
          </Box>

          {/* INPUT */}
          <Box sx={{ mt: 1 }}>
            <ChatInput onSend={handleSend} />
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ChatbotBasePage;
