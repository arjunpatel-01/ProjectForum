import User from "@/utils/models";
import { useDescope, useUser } from "@descope/react-sdk";
import { Logout } from "@mui/icons-material";
import { 
    Avatar, 
    Divider, 
    IconButton, 
    ListItem, 
    ListItemIcon, 
    Menu, 
    MenuItem, 
    Tooltip, 
    Typography
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";

let testUser: User;

export default function AccountMenu() {
    const { user, isUserLoading } = useUser();
    if (!isUserLoading){
        testUser = {
            name: user?.name!,
            email: user?.email!,
            userId: user?.userId
        }
    }
    const { logout } = useDescope();
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = useCallback(() => {
        // Delete Descope refresh token cookie.
        // This is only required if Descope tokens are NOT managed in cookies.
        document.cookie = "DSR=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
        logout();
        router.push("/");
    }, [logout, router]);

    return (
        <React.Fragment>
            <Tooltip title="Account settings">
                <IconButton 
                    sx={{ marginLeft: "auto" }}
                    size="small"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <Avatar src="/Logo.png"/>
                </IconButton>  
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            borderRadius: 7
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <ListItem>
                    <Avatar src="/Logo.png"/> 
                    <Typography>
                        {testUser.email}
                    </Typography>
                </ListItem>

                <Divider />

                <MenuItem onClick={onLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}