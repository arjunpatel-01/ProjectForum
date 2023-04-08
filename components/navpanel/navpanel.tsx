import { 
    ListItem, 
    ListItemText, 
    MenuItem, 
    MenuList, 
    Select, 
    Typography, 
    createMuiTheme
} from "@mui/material";
import { styled } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import React from "react";

const NAVLINKS = [
    {
        label: "NAVIGATION",
        icon: "",
    },
    {
        label: "Home",
        icon: <HomeIcon sx={{marginRight: "7%"}}/>,
    },
    {
        label: "My Ideas",
        icon: <LightbulbIcon sx={{marginRight: "7%"}}/>,
    },
    {
        label: "My Collection",
        icon: <BookmarkIcon sx={{marginRight: "7%", opacity: "100%"}}/>,
    }
];

const MyMenuItem = styled(MenuItem)({
    "&.Mui-selected": {
        backgroundColor: "rgba(233,144,144,.2)",
        color: "#DF9090",
        stroke: "#DF9090",
        borderLeft: "solid",
        borderLeftWidth: 7,
    },
    "&.Mui-focused": {
    backgroundColor: "#DF9090"
    },
    "&.Mui-focusVisible": {
        backgroundColor: "#DF9090"
    },
    "&.Mui-active": {
        backgroundColor: "#DF9090"
    },
    "&.Mui-selected:hover": {
        backgroundColor: "rgba(233,144,144,.2)",
        color: "#DF9090",
    }
})

export default function CustomNavpanel() {

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleNavItemClick = (
        event: React.MouseEvent<HTMLElement>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };
    
    return (
        <React.Fragment>
            <MenuList sx={{paddingY: "0", marginLeft: "30%", marginRight: "10%"}}>

                {NAVLINKS.map((link, index) => (
                    (index === 0) ? 
                        <ListItem key={index}>
                            <ListItemText sx={{margin: 0}}>
                                <Typography color={"#8B8B8B"}>
                                    {link.label} {/*TODO: Change the title here*/}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    :
                        <MyMenuItem 
                            key={index}
                            selected={index === selectedIndex}
                            onClick={(event) => handleNavItemClick(event, index)}
                            sx={{ paddingY: "4%" }}
                        >
                            <ListItemText>
                                <Typography sx={{display: "flex", alignItems: "center", fontWeight: "bold"}}>
                                    {link.icon}
                                    {link.label}
                                </Typography>
                            </ListItemText>
                        </MyMenuItem>
                ))}

            </MenuList>
        </React.Fragment>
    )
}