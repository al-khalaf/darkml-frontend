import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  ListItemIcon,
  Tooltip,
  Avatar,
  Stack,

  useTheme,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChatIcon from '@mui/icons-material/Chat';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TuneIcon from '@mui/icons-material/Tune';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

import { Outlet, useNavigate, NavLink as RouterNavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { alpha } from '@mui/material/styles';


/* ================================
   NAV CONFIG
=================================*/

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
}

const getNavItemsForRole = (role?: string): NavItem[] => {
  switch (role) {
    case 'STUDENT':
      return [
        { label: 'Dashboard', to: '/student', icon: <DashboardIcon /> },
        { label: 'My Courses', to: '/lms/my-courses', icon: <SchoolIcon /> },
        { label: 'Assessments', to: '/lms/assessments', icon: <QuizIcon /> },
        { label: 'General Analytics', to: '/analytics/student', icon: <BarChartIcon /> },
        { label: 'Practice & Learn', to: '/student/practice', icon: <AutoGraphIcon /> },
        { label: 'Ask Tutor (Chat)', to: '/ai/chat/student', icon: <ChatIcon /> },
      ];

    case 'TEACHER':
      return [
        { label: 'Dashboard', to: '/teacher', icon: <DashboardIcon /> },
        { label: 'Courses', to: '/lms/courses', icon: <SchoolIcon /> },
        { label: 'Teacher Analytics', to: '/analytics/class', icon: <BarChartIcon /> },
        { label: 'AI Grading', to: '/ai/grading', icon: <SmartToyIcon /> },
        { label: 'Questions Generator', to: '/ai/questions', icon: <QuizIcon /> },
        { label: 'Teacher Chatbot', to: '/ai/chat/teacher', icon: <ChatIcon /> },
      ];

    case 'ADMIN':
      return [
        { label: 'Dashboard', to: '/admin', icon: <DashboardIcon /> },
        { label: 'Division Analytics', to: '/analytics/division', icon: <ShowChartIcon /> },
        { label: 'Admin Chatbot', to: '/ai/chat/admin', icon: <ChatIcon /> },
        { label: 'What-If Engine', to: '/ai/what-if', icon: <PsychologyIcon /> },
      ];

    case 'SUPER_ADMIN':
      return [
        { label: 'Dashboard', to: '/superadmin', icon: <DashboardIcon /> },
        { label: 'School Analytics', to: '/analytics/school', icon: <BarChartIcon /> },
        { label: 'AI Modules', to: '/governance/modules', icon: <SmartToyIcon /> },
        { label: 'AI Overrides', to: '/governance/overrides', icon: <TuneIcon /> },
        { label: 'AI Incidents', to: '/governance/incidents', icon: <WarningAmberIcon /> },
        { label: 'AI Calibration', to: '/governance/calibration', icon: <AutoGraphIcon /> },
        { label: 'AI Monitoring', to: '/governance/monitoring', icon: <MonitorHeartIcon /> },
        { label: 'SuperAdmin Chatbot', to: '/ai/chat/superadmin', icon: <ChatIcon /> },
      ];

    default:
      return [];
  }
};


/* ================================
   MAIN LAYOUT COMPONENT
=================================*/

const MainLayout: React.FC = () => {
  const theme = useTheme();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = React.useState(false);

  const expandedWidth = 240;
  const collapsedWidth = 80;
  const drawerWidth = collapsed ? collapsedWidth : expandedWidth;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = getNavItemsForRole(user?.role);


  /* ================================
     SIDEBAR CONTENT
  =================================*/

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      {/* LOGO HEADER */}
      <Toolbar
        sx={{
          minHeight: 72,
          px: collapsed ? 1.5 : 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={collapsed ? 0 : 1.5}
          sx={{
            width: '100%',
            justifyContent: collapsed ? 'center' : 'flex-start',
            minWidth: 0,
          }}
        >
          {/* CLEAN THE LOGO BOX */}
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 2,
              backgroundColor: theme.palette.primary.light,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 800, letterSpacing: '0.1em', color: theme.palette.primary.dark }}
            >
              DM
            </Typography>
          </Box>

          {!collapsed && (
            <Box sx={{ overflow: 'hidden', minWidth: 0 }}>
              <Typography
                variant="subtitle2"
                noWrap
                sx={{
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'text.secondary',
                  fontSize: 10,
                }}
              >
                DarkML
              </Typography>

              <Typography variant="body2" noWrap sx={{ opacity: 0.9 }}>
                Learning Control
              </Typography>
            </Box>
          )}
        </Stack>
      </Toolbar>

      {/* NAV LIST */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 1, py: 1.5 }}>
        <List dense sx={{ pt: 0 }}>
          {navItems.map((item) => (
            <ListItem key={item.to} disablePadding sx={{ display: 'block' }}>
              <Tooltip
                title={collapsed ? item.label : ''}
                placement="right"
                arrow
                disableHoverListener={!collapsed}
              >
                <ListItemButton
                  component={RouterNavLink}
                  to={item.to}
                  sx={{
                    borderRadius: 999,
                    px: collapsed ? 1.2 : 1.5,
                    py: 1,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.light, 0.12),
                    },
                    '&.active': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.15),
                      color: theme.palette.primary.dark,
                      '& .MuiListItemIcon-root': {
                        color: theme.palette.primary.dark,
                      },
                    },
                    transition: theme.transitions.create(['background-color', 'color'], {
                      duration: theme.transitions.duration.shortest,
                    }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: collapsed ? 'auto' : 32,
                      color: 'text.secondary',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      noWrap: true,
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                    sx={{
                      opacity: collapsed ? 0 : 1,
                      transform: collapsed ? 'translateX(-8px)' : 'none',
                      transition: 'opacity 180ms ease, transform 180ms ease',
                      ml: collapsed ? 0 : 0.5,
                      whiteSpace: 'nowrap',
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* USER FOOTER */}
      <Box
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          px: collapsed ? 1.5 : 2,
          py: 1.5,
        }}
      >
        <Stack
          direction={collapsed ? 'column' : 'row'}
          spacing={collapsed ? 1 : 1.5}
          alignItems="center"
          justifyContent={collapsed ? 'center' : 'space-between'}
        >
          <Avatar sx={{ width: 32, height: 32, fontSize: 14, bgcolor: 'primary.main' }}>
            {user?.name?.[0]?.toUpperCase() ?? '?'}
          </Avatar>

          {!collapsed && (
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body2" noWrap sx={{ fontWeight: 500 }}>
                {user?.name ?? 'User'}
              </Typography>

              <Typography variant="caption" noWrap sx={{ color: 'text.secondary' }}>
                {user?.role ?? 'Unknown'}
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );


  /* ================================
     LAYOUT STRUCTURE
  =================================*/

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        bgcolor: 'transparent',
        overflowX: 'hidden',
      }}
    >
      {/* APP BAR */}
      <AppBar
        position="fixed"
        color="default"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: alpha(theme.palette.background.paper, 0.9),
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar sx={{ gap: 2, minHeight: { xs: 56, sm: 64 } }}>
          <IconButton onClick={() => setCollapsed((prev) => !prev)}>
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }}>
            <Stack spacing={0.1}>
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'text.secondary',
                  fontSize: { xs: 8, sm: 10 },
                }}
              >
                DarkML – LMS Control
              </Typography>

              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  fontSize: { xs: 14, sm: 20 },
                }}
              >
                {user?.role ? `${user.role} workspace` : 'Workspace'}
              </Typography>
            </Stack>
          </Box>

          {/* USER INFO + LOGOUT */}
          {user && (
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }} noWrap>
                  {user.name}
                </Typography>

                <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
                  Signed in
                </Typography>
              </Box>

              <Avatar sx={{ width: 32, height: 32, fontSize: 14, bgcolor: 'primary.main' }}>
                {user.name?.[0]?.toUpperCase() ?? '?'}
              </Avatar>

              <Button
                variant="outlined"
                size="small"
                onClick={handleLogout}
                sx={{
                  borderColor: 'divider',
                  color: 'text.secondary',
                  '&:hover': {
                    borderColor: 'text.primary',
                    bgcolor: 'action.hover',
                  },
                }}
              >
                Logout
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      {/* SIDEBAR DRAWER */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            transition: (theme) =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shortest,
              }),
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* MAIN CONTENT WRAPPER */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Box
          sx={{
            px: { xs: 2.5, md: 4 },
            py: 3,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 1440 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
