import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { School, Person, Book, Dashboard, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Students', icon: <School />, path: '/students' },
    { text: 'Teachers', icon: <Person />, path: '/teachers' },
    { text: 'Courses', icon: <Book />, path: '/courses' },
];

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#f5f5f5',
                },
            }}
        >
            <Box sx={{ overflow: 'auto', mt: 8 }}>
                <Typography variant="h6" sx={{ p: 2, color: 'primary.main' }}>
                    Menu
                </Typography>
                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => navigate(item.path)}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'primary.light',
                                    color: 'white',
                                    '& .MuiListItemIcon-root': {
                                        color: 'white',
                                    },
                                },
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
