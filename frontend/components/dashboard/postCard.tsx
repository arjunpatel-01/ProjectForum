import { 
    Avatar,
    Box, 
    Button, 
    Card, 
    Container, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    Divider, 
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    Grid, 
    IconButton, 
    List, 
    ListItem, 
    ListItemIcon, 
    Menu, 
    MenuItem, 
    Modal, 
    PaletteColorOptions, 
    Paper, 
    Radio, 
    RadioGroup, 
    TextField, 
    ThemeProvider, 
    Tooltip, 
    Typography, 
    createTheme,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ReportIcon from '@mui/icons-material/Report';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

import React, { useCallback, useEffect, useState } from "react";
import style from "./dashboard.module.scss"
import CustomNavpanel from "../navpanel/navpanel";
import { useUser } from "@descope/react-sdk";
import User from "@/utils/models";
import * as EmailValidator from 'email-validator';
import { Logout } from "@mui/icons-material";

declare module '@mui/material/styles' {
    interface CustomPalette {
        post: PaletteColorOptions;
    }
    interface Palette extends CustomPalette {}
    interface PaletteOptions extends CustomPalette {}
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });
const themeView = createTheme({
    palette: {
        post: createColor('#DF9090'),
        primary: createColor('#DF9090')
    }
});

let userData: User;
const reportTypes = ["Spam", "Inappropriate", "Violence or Hate Speech", "Illegal Activity", "Unsafe Link"];

export default function PostCard(props: {
    post: { 
        id: string
        title: string 
        creator_name: string
        description: string
        is_started: boolean
        github_url: string | null
        creator_id: string
        timestamp: string
        is_completed: string
        contact_info: string | null
        is_flagged: boolean
        completed_url: string
    },
    index: number,
    updatePostsArrays: any,
    savedPosts: any
}) {

    const { user, isUserLoading } = useUser();
    if (!isUserLoading){
        userData = {
            name: user?.name!,
            email: user?.email!,
            userId: user?.userId
        }
    }

    const [reportAnchorEl, setReportAnchorEl] = useState<null | HTMLElement>(null);
    const openReportMenu = Boolean(reportAnchorEl);

    const [completedModalDisplay, setCompletedModalDisplay] = useState(false);
    const [deletePostPopupDisplay, setDeletePostPopupDisplay] = useState(false);
    const [openInFullDisplay, setOpenInFullDisplay] = useState(false);

    const [completedLink, setCompletedLink] = useState("");
    const [completedLinkError, setCompletedLinkError] = useState(false);

    const handleCompletedLinkChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setCompletedLink(event.target.value);
    }

    const handleReportMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setReportAnchorEl(event.currentTarget);
    };

    const handleReportMenuClose = () => {
        setReportAnchorEl(null);
    };

    const handleCompletedModalOpen = () => {
        setCompletedModalDisplay(true);
    };

    const handleCompletedModalClose = () => {
        setCompletedLinkError(false);
        setCompletedLink("");
        setCompletedModalDisplay(false);
    };

    const handleDeletePostPopupOpen = () => {
        setDeletePostPopupDisplay(true);
    };

    const handleDeletePostPopupClose = () => {
        setDeletePostPopupDisplay(false);
    };

    const handleOpenInFullOpen = () => {
        setOpenInFullDisplay(true);
    }

    const handleOpenInFullClose = () => {
        setOpenInFullDisplay(false);
    }

    const handleSave = async () => {
        //save
        const request = await fetch('/api/users/'+userData.userId+"/post/"+props.post.id+"/save", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        const response = await request.json();
        console.log("saved: ", response);

        props.updatePostsArrays();
    }

    const handleUnsave = async () => {
        //unsave
        const request = await fetch('/api/users/'+userData.userId+"/post/"+props.post.id+"/unsave", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });
        const response = await request.text();
        console.log(response);

        props.updatePostsArrays();
    }

    const handleFlag = async (message: string) => {
        const request = await fetch('/api/posts/'+props.post.id+"/flag", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: message
        });
        const response = await request.text();
        console.log(response);

        props.updatePostsArrays();
    }

    const handleComplete = async () => {
        if (!props.post.is_completed) {
            var validUrl = require('valid-url');
            var validLink: boolean = validUrl.isHttpsUri(completedLink);
            if (completedLink === "" || !validLink) {
                setCompletedLinkError(completedLink==="" || !validLink);
            } else {
                const request = await fetch('/api/posts/'+props.post.id+"/completed", {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: completedLink
                });
                const response = await request.json();
                console.log("completed: ", response);

                props.updatePostsArrays();
                handleCompletedModalClose();
            }
        } else {
            const request = await fetch('/api/posts/'+props.post.id+"/completed", {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: "incomplete"
            });
            const response = await request.json();
            console.log("completed: ", response);

            props.updatePostsArrays();
        }

    }

    const handleDelete = async () => {
        const request = await fetch('/api/posts/'+props.post.id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        const response = await request.text();
        console.log(response);

        props.updatePostsArrays();
    }

    return (
        <React.Fragment>
            <ThemeProvider theme={themeView}>
                <div key={props.index} style={{paddingTop: "10px"}}>
                    <Card sx={{height: "400px"}}>
                        <Grid container spacing={0} width={"100%"} padding="10px">
                            <Grid item xs={12} sx={{textAlign: "right"}}>
                                {props.post.creator_id===userData.userId ? (
                                    <>
                                        <Tooltip title="Delete post">
                                            <IconButton onClick={handleDeletePostPopupOpen} >
                                                <CloseIcon fontSize="medium" sx={{color: "gray"}} />
                                            </IconButton>
                                        </Tooltip>

                                        <Dialog
                                            open={deletePostPopupDisplay} 
                                            onClose={handleDeletePostPopupClose}
                                        >
                                            <DialogTitle>
                                                Are you sure you want to delete the project "{props.post.title}"?
                                            </DialogTitle>

                                            <DialogActions>
                                                <Button color="primary" onClick={handleDeletePostPopupClose}>
                                                    <Typography>
                                                        No
                                                    </Typography>
                                                </Button>
                                                <Button variant="contained" color="primary" sx={{color: "white"}} onClick={handleDelete} >
                                                    <Typography>
                                                        Yes
                                                    </Typography>
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </>
                                ) : (
                                    <IconButton sx={{visibility: "hidden"}}>
                                        <CloseIcon fontSize="medium" sx={{color: "gray", visibility: "hidden"}} />
                                    </IconButton>
                                )}
                            </Grid>
                        </Grid>

                        <Grid container spacing={0} width={"100%"} height={"220px"} padding="0px 20px" id="title_and_description" >
                            <Grid item xs={12} zeroMinWidth height={"100%"} overflow="hidden">
                                <Typography variant="h3" color="primary">
                                    {props.post.title} 
                                </Typography>

                                <Divider sx={{marginBottom: "20px"}} />

                                <Typography variant="body1" sx={{overflowWrap: "break-word", whiteSpace: "pre-line"}}>
                                    {props.post.description}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={0} width={"100%"} height={"70px"} padding="0px 20px">
                            <Grid item xs={12}>
                                {props.post.is_started && (
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <GitHubIcon fontSize="small" sx={{color: "#6e5494"}}/>
                                        <Typography variant="body2" marginLeft="3px" sx={{color: "#6e5494", "&:hover": { color: "#483761" }}}>
                                            <a href={props.post.github_url!} target="_blank" rel="noopener" >{props.post.github_url}</a>
                                        </Typography>
                                    </div>
                                )}

                                {props.post.contact_info!==null && (
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <EmailIcon fontSize="small"/>
                                        <Typography variant="body2" marginLeft="3px">
                                            {props.post.contact_info}
                                        </Typography>
                                    </div>
                                )}

                                {props.post.is_completed && (
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <CheckCircleIcon color={"success"} fontSize="small" />
                                        <Typography variant="body2" marginLeft="3px" sx={{"&:hover": { color: "DarkGreen" }}} color={"green"}>
                                            <a href={props.post.completed_url!} target="_blank" rel="noopener" >{props.post.completed_url}</a>
                                        </Typography>
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                        
                        <Divider />

                        <Grid container spacing={0} width={"100%"} alignItems="center" padding="5px 10px">
                            <Grid item xs={7}>
                                {props.post.is_completed ? (
                                    props.post.creator_id === userData.userId ?
                                    (
                                        <Tooltip title="Mark incomplete">
                                            <IconButton size="small" onClick={handleComplete}>
                                                <CheckCircleIcon color={"success"} fontSize="medium" />
                                            </IconButton>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="You do not have permission to mark this incomplete">
                                            <IconButton size="small">
                                                <CheckCircleIcon color={"success"} fontSize="medium" />
                                            </IconButton>
                                        </Tooltip>
                                    )
                                ) : (
                                    <>
                                        <Tooltip title="Mark completed">
                                            <IconButton size="small" onClick={handleCompletedModalOpen} >
                                                <CheckCircleOutlineIcon fontSize="medium" />
                                            </IconButton>
                                        </Tooltip>

                                        <Dialog
                                            open={completedModalDisplay} 
                                            onClose={handleCompletedModalClose}
                                        >
                                            <DialogTitle>
                                                Ready to call the project "{props.post.title}" finished? Awesome!
                                                <DialogContentText>
                                                    Paste the link to the product below so the creator can verify it!
                                                </DialogContentText>
                                            </DialogTitle>

                                            <DialogContent>
                                                <TextField
                                                    required
                                                    value={completedLink}
                                                    margin="none"
                                                    error={completedLinkError}
                                                    id="completedLink"
                                                    label="Product"
                                                    type="text"
                                                    fullWidth
                                                    variant="standard"
                                                    placeholder="Link to the finished product"
                                                    color="primary"
                                                    onChange={handleCompletedLinkChange}
                                                />
                                            </DialogContent>

                                            <DialogActions>
                                                <Button color="primary" onClick={handleCompletedModalClose}>
                                                    <Typography>
                                                        Cancel
                                                    </Typography>
                                                </Button>
                                                <Button variant="contained" color="primary" sx={{color: "white"}} onClick={handleComplete} >
                                                    <Typography>
                                                        Submit
                                                    </Typography>
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </>
                                )}

                                {props.post.creator_id !== userData.userId && (
                                    props.savedPosts.length !== 0 ? (
                                        props.savedPosts.map((p: any, index: number) => {
                                                if (p.id === props.post.id) {
                                                    return( 
                                                        <Tooltip key={index} title="Unsave">
                                                            <IconButton size="small" onClick={handleUnsave} >
                                                                <BookmarkIcon key={index} fontSize="medium" color="info"  /> 
                                                            </IconButton>
                                                        </Tooltip>
                                                    )
                                                } else {
                                                    return( 
                                                        <Tooltip key={index} title="Save">
                                                            <IconButton size="small" onClick={handleSave} >
                                                                <BookmarkBorderIcon key={index} fontSize="medium" color="info" /> 
                                                            </IconButton>
                                                        </Tooltip>
                                                        
                                                    )
                                                }
                                        })
                                    ) : (
                                        <Tooltip title="Save">
                                            <IconButton size="small" onClick={handleSave} >
                                                <BookmarkBorderIcon fontSize="medium" color="info" />
                                            </IconButton>
                                        </Tooltip>
                                    )
                                )}

                                {props.post.is_flagged ? (
                                    <Tooltip title="Report status pending">
                                        <IconButton size="small">
                                            <ReportIcon fontSize="medium" color="error" />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <>
                                        <Tooltip title="Report">
                                            <IconButton size="small" onClick={handleReportMenuOpen}>
                                                <ReportGmailerrorredIcon fontSize="medium" color="error" />
                                            </IconButton>
                                        </Tooltip>
                                        
                                        <Menu
                                            anchorEl={reportAnchorEl}
                                            id="account-menu"
                                            open={openReportMenu}
                                            onClose={handleReportMenuClose}
                                            onClick={handleReportMenuClose}
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
                                            {reportTypes.map((type, index) => (
                                                <MenuItem key={index} onClick={() => handleFlag(type)}>
                                                    {type}
                                                </MenuItem>
                                            ))}            
                                        </Menu>
                                    </>
                                )}

                            </Grid>

                            <Grid item container xs={5} alignItems="center">
                                <Grid item xs={10}  sx={{textAlign: "right"}}>
                                    <Typography variant="body2">
                                        {new Date(props.post.timestamp).toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}
                                    </Typography>
                                    <Typography variant="body2" color="primary">
                                        {props.post.creator_name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}  sx={{textAlign: "right"}}>
                                    <>
                                        <Tooltip title="Open in full">
                                            <IconButton size="small" onClick={handleOpenInFullOpen}>
                                                <OpenInFullIcon fontSize="medium" sx={{color: "gray"}} />
                                            </IconButton>
                                        </Tooltip>

                                        <Dialog
                                            open={openInFullDisplay} 
                                            onClose={handleOpenInFullClose}
                                        >
                                            <DialogTitle>
                                                <Typography variant="h3" color="primary">
                                                    {props.post.title} 
                                                </Typography>                                            
                                            </DialogTitle>

                                            <Divider sx={{marginBottom: "20px"}} />

                                            <DialogContent sx={{overflowX: "auto"}}>
                                                <Typography variant="body1" sx={{overflowWrap: "break-word", whiteSpace: "pre-line"}}>
                                                    {props.post.description}
                                                </Typography>
                                            </DialogContent>

                                            <DialogContent>
                                                {props.post.is_started && (
                                                    <div style={{display: "flex", alignItems: "center"}}>
                                                        <GitHubIcon fontSize="small" sx={{color: "#6e5494"}}/>
                                                        <Typography variant="body2" marginLeft="3px" sx={{color: "#6e5494", "&:hover": { color: "#483761" }}}>
                                                            <a href={props.post.github_url!} target="_blank" rel="noopener" >{props.post.github_url}</a>
                                                        </Typography>
                                                    </div>
                                                )}

                                                {props.post.contact_info!==null && (
                                                    <div style={{display: "flex", alignItems: "center"}}>
                                                        <EmailIcon fontSize="small"/>
                                                        <Typography variant="body2" marginLeft="3px">
                                                            {props.post.contact_info}
                                                        </Typography>
                                                    </div>
                                                )}

                                                {props.post.is_completed && (
                                                    <div style={{display: "flex", alignItems: "center"}}>
                                                        <CheckCircleIcon color={"success"} fontSize="small" />
                                                        <Typography variant="body2" marginLeft="3px" sx={{"&:hover": { color: "DarkGreen" }}} color={"green"}>
                                                            <a href={props.post.completed_url!} target="_blank" rel="noopener" >{props.post.completed_url}</a>
                                                        </Typography>
                                                    </div>
                                                )}
                                            </DialogContent>

                                            <Divider />

                                            <DialogContent>
                                                {props.post.is_completed ? (
                                                    props.post.creator_id === userData.userId ?
                                                    (
                                                        <Tooltip title="Mark incomplete">
                                                            <IconButton size="small" onClick={handleComplete}>
                                                                <CheckCircleIcon color={"success"} fontSize="medium" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    ) : (
                                                        <Tooltip title="You do not have permission to mark this incomplete">
                                                            <IconButton size="small">
                                                                <CheckCircleIcon color={"success"} fontSize="medium" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )
                                                ) : (
                                                    <>
                                                        <Tooltip title="Mark completed">
                                                            <IconButton size="small" onClick={handleCompletedModalOpen} >
                                                                <CheckCircleOutlineIcon fontSize="medium" />
                                                            </IconButton>
                                                        </Tooltip>

                                                        <Dialog
                                                            open={completedModalDisplay} 
                                                            onClose={handleCompletedModalClose}
                                                        >
                                                            <DialogTitle>
                                                                Ready to call the project "{props.post.title}" finished? Awesome!
                                                                <DialogContentText>
                                                                    Paste the link to the product below so the creator can verify it!
                                                                </DialogContentText>
                                                            </DialogTitle>

                                                            <DialogContent>
                                                                <TextField
                                                                    required
                                                                    value={completedLink}
                                                                    margin="none"
                                                                    error={completedLinkError}
                                                                    id="completedLink"
                                                                    label="Product"
                                                                    type="text"
                                                                    fullWidth
                                                                    variant="standard"
                                                                    placeholder="Link to the finished product"
                                                                    color="primary"
                                                                    onChange={handleCompletedLinkChange}
                                                                />
                                                            </DialogContent>

                                                            <DialogActions>
                                                                <Button color="primary" onClick={handleCompletedModalClose}>
                                                                    <Typography>
                                                                        Cancel
                                                                    </Typography>
                                                                </Button>
                                                                <Button variant="contained" color="primary" sx={{color: "white"}} onClick={handleComplete} >
                                                                    <Typography>
                                                                        Submit
                                                                    </Typography>
                                                                </Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </>
                                                )}

                                                {props.post.creator_id !== userData.userId && (
                                                    props.savedPosts.length !== 0 ? (
                                                        props.savedPosts.map((p: any, index: number) => {
                                                                if (p.id === props.post.id) {
                                                                    return( 
                                                                        <Tooltip key={index} title="Unsave">
                                                                            <IconButton size="small" onClick={handleUnsave} >
                                                                                <BookmarkIcon key={index} fontSize="medium" color="info"  /> 
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    )
                                                                } else {
                                                                    return( 
                                                                        <Tooltip key={index} title="Save">
                                                                            <IconButton size="small" onClick={handleSave} >
                                                                                <BookmarkBorderIcon key={index} fontSize="medium" color="info" /> 
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                        
                                                                    )
                                                                }
                                                        })
                                                    ) : (
                                                        <Tooltip title="Save">
                                                            <IconButton size="small" onClick={handleSave} >
                                                                <BookmarkBorderIcon fontSize="medium" color="info" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )
                                                )}

                                                {props.post.is_flagged ? (
                                                    <Tooltip title="Report status pending">
                                                        <IconButton size="small">
                                                            <ReportIcon fontSize="medium" color="error" />
                                                        </IconButton>
                                                    </Tooltip>
                                                ) : (
                                                    <>
                                                        <Tooltip title="Report">
                                                            <IconButton size="small" onClick={handleReportMenuOpen}>
                                                                <ReportGmailerrorredIcon fontSize="medium" color="error" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        
                                                        <Menu
                                                            anchorEl={reportAnchorEl}
                                                            id="account-menu"
                                                            open={openReportMenu}
                                                            onClose={handleReportMenuClose}
                                                            onClick={() => {handleReportMenuClose; handleOpenInFullClose;}}
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
                                                            {reportTypes.map((type, index) => (
                                                                <MenuItem key={index} onClick={() => handleFlag(type)}>
                                                                    {type}
                                                                </MenuItem>
                                                            ))}            
                                                        </Menu>
                                                    </>
                                                )}
                                            </DialogContent>

                                            <DialogContent>
                                                <Grid item container xs={5} alignItems="center">
                                                    <Grid item xs={10}  sx={{textAlign: "right"}}>
                                                        <Typography variant="body2">
                                                            {new Date(props.post.timestamp).toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}
                                                        </Typography>
                                                        <Typography variant="body2" color="primary">
                                                            {props.post.creator_name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2}  sx={{textAlign: "right"}}>
                                                        <>
                                                            <Tooltip title="Close">
                                                                <IconButton size="small" onClick={handleOpenInFullClose}>
                                                                    <CloseFullscreenIcon fontSize="medium" sx={{color: "gray"}} />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </>
                                                    </Grid>
                                                </Grid>
                                            </DialogContent>

                                            <DialogActions>
                                                
                                            </DialogActions>
                                        </Dialog>
                                    </>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </div>
            </ThemeProvider>
        </React.Fragment>
    )
}