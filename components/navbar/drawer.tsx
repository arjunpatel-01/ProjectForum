import React, { useState } from "react";
import {
    Avatar,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function DrawerComp()  {
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <React.Fragment>
            <Drawer
                anchor="top"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <List>
                    <ListItem>
                        <ListItemIcon style={{alignItems: "center"}}>
                            <Avatar src="/Logo.png"/>
                            <ListItemText style={{paddingLeft: "5px", color: "black"}}>arjun.patel23@utexas.edu</ListItemText>
                        </ListItemIcon>
                    </ListItem>
                    
                    <Divider />

                    <ListItemButton>
                        <ListItemIcon style={{alignItems: "center"}}>
                            <LogoutIcon style={{marginLeft: "10px"}}/>
                            <ListItemText style={{paddingLeft: "10px"}}>Logout</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon onClick={() => setOpenDrawer(!openDrawer)} style={{alignItems: "center", justifyContent: "center", width: "100%"}}>
                            <ExpandLessIcon />
                        </ListItemIcon>
                    </ListItemButton>
                </List>
            </Drawer>
            <IconButton
                sx={{ color: "white"}}
                onClick={() => setOpenDrawer(!openDrawer)}
            >
                <MenuIcon sx={{color: "black"}}/>
            </IconButton>
        </React.Fragment>
    );
};