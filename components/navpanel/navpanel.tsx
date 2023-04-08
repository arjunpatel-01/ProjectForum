import { 
    FormControl,
    InputLabel,
    ListItem, 
    ListItemText, 
    MenuItem, 
    MenuList, 
    Typography, 
    useMediaQuery,
    useTheme
} from "@mui/material";
import { styled } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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

const MyFormControl = styled(FormControl)({
    "& .Mui-focused" : {
        color: "#DF9090",
    },

    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#DF9090"
    }
})

export default function CustomNavpanel() {
    
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [nav, setNav] = React.useState('');

    const handleDropdown = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        setNav(event.target.value);
    };

    const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavItemClick = (
        event: React.MouseEvent<HTMLElement>,
        index: number,
    ) => {
        setSelectedIndex(index);
        handleClose()
    };
    
    return (
        <React.Fragment>
            { !isMatch ? (
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
            ) : (
                <>
                    <MyFormControl fullWidth sx={{marginTop: "5%"}}>                
                        <InputLabel id="demo-simple-select-label">Navigation</InputLabel>
                        <Select 
                            label="Navigation" 
                            value={nav}
                            onChange={handleDropdown}
                        >
                            {NAVLINKS.map((link, index) => (
                                <MyMenuItem 
                                        key={index}
                                        selected={index === selectedIndex}
                                        disabled={index === 0}
                                        onClick={(event) => handleNavItemClick(event, index)}
                                        sx={{ paddingY: "4%" }}
                                        value={link.label}
                                >
                                    <ListItemText>
                                        <Typography sx={{display: "flex", alignItems: "center", fontWeight: "bold"}}>
                                            {link.icon}
                                            {link.label}
                                        </Typography>
                                    </ListItemText>
                                </MyMenuItem>
                            ))}
                        </Select>
                    </MyFormControl>
                </>
            )}
        </React.Fragment>
    )
}