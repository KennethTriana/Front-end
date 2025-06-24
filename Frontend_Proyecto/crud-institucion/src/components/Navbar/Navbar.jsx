import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Drawer, IconButton, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        margin: theme.spacing(2),
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

const normalizeText = (text) => {
    return text.toLowerCase().replace(/\s+/g, '-'); 
};

export default function Navbar() {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();


    const hideNavbarRoutes = ['/login', '/registro', '/', '/recuperar-contrasena'];
    if (hideNavbarRoutes.includes(location.pathname)) {
        return null;
    }

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const drawer = (
        <div className={classes.drawer}>
            <List>
                {['Categoria', 'Producto', 'Ventas', 'Profile', 'Historial', 'Inventario', 'Usuarios', 'Alertas'].map((text) => (
                    <ListItem button component={Link} to={`/${text}`} key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" className={classes.title}>
                        Sistema de Inventario LGC
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerToggle}
                        sx={{ display: { xs: 'none', md: 'flex' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                {drawer}
            </Drawer>
        </>
    );
}
