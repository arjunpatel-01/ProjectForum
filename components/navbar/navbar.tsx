import Image from 'next/image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from "./navbar.module.scss";
import {
    AppBar,
    Avatar,
    Button,
    IconButton,
    Link,
    Tab,
    Tabs,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import DrawerComp from "./drawer";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import React, { useState } from 'react';

export default function CustomNavbar() {

    // const [value, setValue] = useState();
    const theme = useTheme();
    console.log(theme);
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    console.log(isMatch);

    return (
        <React.Fragment>
            <AppBar className={styles.CustomNavbar}>
                <Toolbar>
                    { isMatch ? (
                        <>
                            <Typography sx={{ fontSize: "2rem", color: "black"}}>
                                IDEA SHARE
                            </Typography>
                            <DrawerComp />
                        </>
                    ) : (
                        <>
                            <Link href="/">
                                <Image src="/Logo.png" alt="Logo" width={60} height={60} style={{marginTop: "15%", marginBottom: "15%",}}/>
                            </Link>
                            <Typography sx={{ fontSize: "1.5rem", marginLeft: "1%", color: "black"}}>
                                    IDEA SHARE
                            </Typography>
                            <IconButton sx={{ marginLeft: "auto" }}>
                                <Avatar src="/Logo.png"/>
                            </IconButton>  
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}