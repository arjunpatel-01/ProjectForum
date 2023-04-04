import React, { useState } from "react";
import {
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";


const pages = ["Sign out"];
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
                    {pages.map((page, index) => (
                        <ListItemButton key={index}>
                        <ListItemIcon>
                            <ListItemText>{page}</ListItemText>
                        </ListItemIcon>
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            <IconButton
                sx={{ color: "white", marginLeft: "auto" }}
                onClick={() => setOpenDrawer(!openDrawer)}
            >
                <MenuIcon sx={{color: "black"}}/>
            </IconButton>
        </React.Fragment>
    );
};