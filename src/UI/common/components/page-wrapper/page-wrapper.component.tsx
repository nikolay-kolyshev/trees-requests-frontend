import React, { FC, memo, PropsWithChildren, useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { routingPages } from '@/UI/routing/routing.constants';
import { useNavigate } from 'react-router-dom';
import { Portal } from '@mui/material';
import { ThemeSwitcher } from '@/UI/common/components/page-wrapper/page-wrapper.styles';
import { $theme, updateThemeEvent } from '@/BLL/models/theme/theme.store';
import { useUnit } from 'effector-react';

const drawerWidth = 240;
const navItems = Object.entries(routingPages);

export const PageWrapper: FC<PropsWithChildren> = memo(({ children }) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();
    const [theme, updateTheme] = useUnit([$theme, updateThemeEvent]);

    const switchTheme = useCallback(() => {
        updateTheme(theme === 'dark' ? 'light' : 'dark');
    }, [updateTheme, theme]);

    const handleDrawerToggle = useCallback(() => {
        setMobileOpen((prevState) => !prevState);
    }, [setMobileOpen]);

    const handleNavigatePage = useCallback(
        (path: string) => {
            navigate(path, {
                replace: true,
            });
        },
        [navigate],
    );

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Лечение деревьев
            </Typography>
            <Divider />
            <List>
                {navItems.map(([key, { path, name }]) => (
                    <ListItem key={key} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleNavigatePage(path)}>
                            <ListItemText primary={name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <Portal>
                <AppBar component="nav">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            <div
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleNavigatePage(routingPages.Home.path)}
                            >
                                Лечение деревьев
                            </div>
                        </Typography>
                        <ThemeSwitcher onChange={switchTheme} checked={theme === 'light'} />
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navItems.map(([key, { path, name }]) => (
                                <Button key={key} sx={{ color: '#fff' }} onClick={() => handleNavigatePage(path)}>
                                    {name}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box component="nav">
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
            </Portal>
            <Box component="main" sx={{ p: 0 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
});
