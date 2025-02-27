import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faTachometerAlt, 
  faEdit, 
  faSignOutAlt, 
  faSignInAlt, 
  faUserPlus,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText 
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = currentUser ? [
    ...(currentUser.role === 'admin' ? [{
      icon: faTachometerAlt,
      text: t('navbar.dashboard'),
      link: '/dashboard'
    }] : []),
    {
      icon: faEdit,
      text: t('navbar.createPost'),
      link: '/create-post'
    }
  ] : [
    {
      icon: faSignInAlt,
      text: t('navbar.login'),
      link: '/login'
    },
    {
      icon: faUserPlus,
      text: t('navbar.register'),
      link: '/register'
    }
  ];

  const drawerContent = (
    <List>
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <FontAwesomeIcon icon={faHome} />
        </ListItemIcon>
        <ListItemText primary="TrendShift" />
      </ListItem>
      {navItems.map((item, index) => (
        <ListItem 
          key={index} 
          button 
          component={Link} 
          to={item.link}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon={item.icon} />
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
      {currentUser && (
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </ListItemIcon>
          <ListItemText primary={t('navbar.logout')} />
        </ListItem>
      )}
    </List>
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              width: '100%' 
            }}
          >
            <Typography 
              variant="h6" 
              component={Link} 
              to="/" 
              sx={{ 
                color: 'inherit', 
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <FontAwesomeIcon icon={faHome} /> TrendShift
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
              {navItems.map((item, index) => (
                <Button 
                  key={index} 
                  color="inherit" 
                  component={Link} 
                  to={item.link}
                  startIcon={<FontAwesomeIcon icon={item.icon} />}
                >
                  {item.text}
                </Button>
              ))}
              {currentUser && (
                <Button 
                  color="inherit" 
                  onClick={logout}
                  startIcon={<FontAwesomeIcon icon={faSignOutAlt} />}
                >
                  {t('navbar.logout')}
                </Button>
              )}
            </Box>

            <Button 
              sx={{ display: { md: 'none' } }} 
              color="inherit" 
              onClick={handleDrawerToggle}
            >
              <FontAwesomeIcon icon={mobileOpen ? faTimes : faBars} />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default Navbar;
