import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar, Divider } from '@mui/material';
import { FaReact } from 'react-icons/fa'; // Official React Icon
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import './Header.css';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function Header() {
  return (
    <AppBar position="fixed" elevation={0} className="saas-appbar">
      <Toolbar className="saas-toolbar">
        
        {/* Left Side: React Logo + Title */}
        <Box className="saas-brand-container">
          <Box className="saas-logo-box">
            {/* React Icon */}
            <DashboardIcon className="react-atom-icon" />
            <Typography variant="h6" className="saas-brand-title">
              <span className="saas-brand-title__suffix">DASHBOARD</span>
            </Typography>
          </Box>

          <Divider orientation="vertical" flexItem className="saas-divider" />

          <Typography variant="body2" className="saas-section-label">
            Posts Management
          </Typography>
        </Box>

        {/* Right Side: Profile & Icons */}
        <Box className="saas-actions-container">
          <Avatar className="saas-avatar">MY</Avatar>

          <IconButton className="saas-action-icon" size="small">
            <PeopleOutlinedIcon fontSize="small" />
          </IconButton>

          <IconButton className="saas-action-icon" size="small">
            <SettingsOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>

      </Toolbar>
    </AppBar>
  );
}