import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  useTheme,
  alpha
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const theme = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    await login(data.username, data.password);
    window.location.href = '/';
  };

  return (
    <Box>
      <Stack spacing={0.5} mb={3}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            letterSpacing: "-0.02em"
          }}
        >
          Login
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            maxWidth: 360
          }}
        >
          Enter your credentials to access your workspace.
        </Typography>
      </Stack>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2.5,
          borderRadius: 3,
          border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
          backgroundColor: theme.palette.background.paper,
          boxShadow:
            "0 8px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.4)",
        }}
      >
        <TextField
          label="Username"
          {...register("username")}
          required
          fullWidth
        />

        <TextField
          label="Password"
          type="password"
          {...register("password")}
          required
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 1,
            py: 1.1,
            borderRadius: 999,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Login
        </Button>
      </Box>

      <Typography
        variant="body2"
        sx={{ mt: 2, color: "text.secondary" }}
      >
        Hint: login as <strong>student</strong>, <strong>teacher</strong>,{" "}
        <strong>admin</strong>, or <strong>super</strong>.
      </Typography>
    </Box>
  );
};

export default LoginPage;
