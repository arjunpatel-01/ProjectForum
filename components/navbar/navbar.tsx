import Image from 'next/image';
import styles from "./navbar.module.scss";
import {
    AppBar,
    Avatar,
    IconButton,
    Link,
    Toolbar,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import DrawerComp from "./drawer";
import React from 'react';
import AccountMenu from './accountMenu';

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
                        <div style={{display: "grid", width: "100%", justifyItems: "center"}}>
                            <Typography sx={{ fontSize: "2rem", color: "black"}}>
                                IDEA SHARE
                            </Typography>
                            <DrawerComp />
                        </div>
                    ) : (
                        <>
                            <Link href="/" style={{marginTop: "10px", marginBottom: "10px",}}>
                                <Image src="/Logo.png" alt="Logo" width={60} height={60}/>
                            </Link>
                            <Typography sx={{ fontSize: "1.5rem", marginLeft: "1%", color: "black"}}>
                                    IDEA SHARE
                            </Typography>
                            <AccountMenu />
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
