import { 
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
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ReportIcon from '@mui/icons-material/Report';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import React, { useCallback, useEffect, useState } from "react";
import style from "./dashboard.module.scss"
import CustomNavpanel from "../navpanel/navpanel";
import { useUser } from "@descope/react-sdk";
import User from "@/utils/models";
import * as EmailValidator from 'email-validator';


// const CARDS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

declare module '@mui/material/styles' {
    interface CustomPalette {
        post: PaletteColorOptions;
    }
    interface Palette extends CustomPalette {}
    interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        post: true;
    }
}

declare module '@mui/material/TextField' {
    interface TextFieldPropsColorOverrides {
        post: true;
    }
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

export default function Dashboard() {
    const { user, isUserLoading } = useUser();
    if (!isUserLoading){
        userData = {
            name: user?.name!,
            email: user?.email!,
            userId: user?.userId
        }
    }

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    const [open, setOpen] = useState(false);
    const [formDisplay, setFormDisplay] = useState(false);
    const [gridOverFlow, setGridOverflow] = useState(false);

    const [title, setTitle] = useState("");
    const [startedValue, setStartedValue] = useState("");
    const [description, setDescription] = useState("");
    const [github, setGithub] = useState("");
    const [contact, setContact] = useState("");

    const [titleError, setTitleError] = useState(false);
    const [startedError, setStartedError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [githubError, setGithubError] = useState(false);
    const [contactError, setContactError] = useState(false);

    const [allPosts, setAllPosts] = useState([] as any[]);
    const [createdPosts, setCreatedPosts] = useState([] as any[]);
    const [savedPosts, setSavedPosts] = useState([] as any[]);
    const [navState, setNavState] = useState("Home");

    const handleTitleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setTitle(event.target.value);
    }

    const handleDescriptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setDescription(event.target.value);
    }

    const handleGithubChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setGithub(event.target.value);
    }

    const handleContactChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setContact(event.target.value);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handlePost = async () => {
        console.log("title: ", title);
        console.log("started value: ", startedValue==="Yes");
        console.log("github: ", github);
        console.log("description: ", description);
        console.log("contact: ", contact);
        console.log(contact)
        var isGithubUrl = require('is-github-url')
        var validGithub: boolean = isGithubUrl(github);
        var validContact: boolean = EmailValidator.validate(contact);

        if (title === "" || startedValue === "" || description === "" || (formDisplay && !validGithub) || ((contact !== "" && contact !== null && contact !== undefined) && !validContact)) {
            setTitleError(title==="");
            setStartedError(startedValue==="");
            setDescriptionError(description==="");
            setGithubError(!validGithub);
            setContactError((contact !== "" && contact !== null && contact !== undefined) && !validContact);
        } else {
            const request = await fetch('/api/users/'+userData.userId+"/post", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title,
                    is_started: startedValue==="Yes",
                    github_url: github,
                    description: description,
                    contact_info: (contact === "" || contact === null || contact === undefined) ? null : contact,
                })
            });
            const response = await request.json();
            console.log("response: ", response);

            getAllPosts().then((posts) => {
                setAllPosts(posts);
            });

            getCreatedPosts().then((posts) => {
                setCreatedPosts(posts);
            });

            handleClose();
        }
    }

    const handleSave = async (postId: string) => {
        //save
        const request = await fetch('/api/users/'+userData.userId+"/post/"+postId+"/save", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        const response = await request.json();
        console.log("saved: ", response);

        getAllPosts().then((posts) => {
            setAllPosts(posts);
        });

        getSavedPosts().then((posts) => {
            setSavedPosts(posts);
        });
    }

    const handleUnsave = async (postId: string) => {
        //unsave
        const request = await fetch('/api/users/'+userData.userId+"/post/"+postId+"/unsave", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });
        const response = await request.text();
        console.log(response);

        getAllPosts().then((posts) => {
            setAllPosts(posts);
        });

        getSavedPosts().then((posts) => {
            setSavedPosts(posts);
        });
    }

    const handleFlag = async (postId: string) => {
        const request = await fetch('/api/posts/'+postId+"/flag", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });
        const response = await request.text();
        console.log(response);

        getAllPosts().then((posts) => {
            setAllPosts(posts);
        });

        getSavedPosts().then((posts) => {
            setSavedPosts(posts);
        });

        getCreatedPosts().then((posts) => {
            setCreatedPosts(posts);
        });
    }

    const handleClose = () => {
        setTitleError(false);
        setStartedError(false);
        setDescriptionError(false);
        setGithubError(false);
        setContactError(false);

        setTitle("");
        setStartedValue("");
        setDescription("");
        setGithub("");
        setContact("");

        setOpen(false);
        setFormDisplay(false);
    }

    const handleFormOn = () => {
        setFormDisplay(true);
    }

    const handleFormOff = () => {
        setFormDisplay(false); 
    }

    const getAllPosts = useCallback(async () => {
        const response = await fetch("/api/posts", {
            method: 'GET'
        });
        const response_body = await response.json();
        if(response.status !== 200){ return []; }
        return response_body; 
    }, []); 

    const getCreatedPosts = useCallback(async () => {
        const response = await fetch('/api/users/'+userData!.userId!+'/creations', {
            method: 'GET'
        });
        const response_body = await response.json();
        if(response.status !== 200){ return []; }
        return response_body;
    }, []);

    const getSavedPosts = useCallback(async () => {
        const response = await fetch('/api/users/'+userData!.userId!+'/saved', {
            method: 'GET'
        });
        const response_body = await response.json();
        if(response.status !== 200){ return []; }
        return response_body;
    }, []);

    useEffect(() => {
        getAllPosts().then((posts) => {
            setAllPosts(posts);
        });
        getCreatedPosts().then((posts) => {
            setCreatedPosts(posts);
        });
        getSavedPosts().then((posts) => {
            setSavedPosts(posts);
        });
    }, [getAllPosts, getCreatedPosts, getSavedPosts, navState]);

    // TODO: convert to functional component
    function generateCard(
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
        }, 
        index: number
    ) {
        return (
            <div key={index} style={{paddingTop: "10px"}}>
                <Card sx={{height: "400px"}}>
                    <Grid container spacing={0} width={"100%"} padding="10px">
                        <Grid item xs={12} sx={{textAlign: "right"}}>
                            {post.creator_id===userData.userId ? (
                                <Tooltip title="Delete post">
                                    <IconButton>
                                        <CloseIcon fontSize="medium" sx={{color: "gray"}} />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <IconButton sx={{visibility: "hidden"}}>
                                    <CloseIcon fontSize="medium" sx={{color: "gray", visibility: "hidden"}} />
                                </IconButton>
                            )}
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} width={"100%"} height={"240px"} padding="0px 20px" id="title_and_description" >
                        <Grid item xs={12} zeroMinWidth height={"100%"} overflow="hidden">
                            <Typography variant="h3" color="primary">
                                {post.title} 
                            </Typography>

                            <Divider sx={{marginBottom: "20px"}} />

                            <Typography variant="body1" sx={{overflowWrap: "break-word", whiteSpace: "pre-line"}}>
                                {post.description}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} width={"100%"} height={"50px"} padding="0px 20px">
                        <Grid item xs={12}>
                            {post.is_started && (
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <GitHubIcon fontSize="small" sx={{color: "#6e5494"}}/>
                                    <Typography variant="body2" marginLeft="3px" sx={{color: "#6e5494", "&:hover": { color: "#483761" }}}>
                                        <a href={post.github_url!} target="_blank" rel="noopener" >{post.github_url}</a>
                                    </Typography>
                                </div>
                            )}

                            {post.contact_info!==null && (
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <EmailIcon fontSize="small"/>
                                    <Typography variant="body2" marginLeft="3px">
                                        {post.contact_info}
                                    </Typography>
                                </div>
                            )}
                        </Grid>
                    </Grid>
                    
                    <Divider />

                    <Grid container spacing={0} width={"100%"} alignItems="center" padding="5px 10px">
                        <Grid item xs={7}>
                            {post.is_completed ? (
                                post.creator_id === userData.userId ?
                                (
                                    <Tooltip title="Mark incomplete">
                                        <IconButton size="small">
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
                                <Tooltip title="Mark completed">
                                    <IconButton size="small">
                                        <CheckCircleOutlineIcon fontSize="medium" />
                                    </IconButton>
                                </Tooltip>
                            )}

                            {post.creator_id !== userData.userId && (
                                savedPosts.length !== 0 ? (
                                    savedPosts.map((p, index) => {
                                            if (p.id === post.id) {
                                                return( 
                                                    <Tooltip title="Unsave">
                                                        <IconButton size="small" onClick={() => handleUnsave(post.id)} >
                                                            <BookmarkIcon key={index} fontSize="medium" color="info"  /> 
                                                        </IconButton>
                                                    </Tooltip>
                                                )
                                            } else {
                                                return( 
                                                    <Tooltip title="Save">
                                                        <IconButton size="small" onClick={() => handleSave(post.id)} >
                                                            <BookmarkBorderIcon key={index} fontSize="medium" color="info" /> 
                                                        </IconButton>
                                                    </Tooltip>
                                                    
                                                )
                                            }
                                    })
                                ) : (
                                    <Tooltip title="Save">
                                        <IconButton size="small" onClick={() => handleSave(post.id)} >
                                            <BookmarkBorderIcon fontSize="medium" color="info" />
                                        </IconButton>
                                    </Tooltip>
                                )
                            )}

                            {/* TODO: Popup menu to indicate report reason: spam, inappropriate, violence or hate speech, illegal activity */}
                            {post.is_flagged ? (
                                <Tooltip title="Report status pending">
                                    <IconButton size="small">
                                        <ReportIcon fontSize="medium" color="error" />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Tooltip title="Report">
                                    <IconButton size="small" onClick={() => handleFlag(post.id)}>
                                        <ReportGmailerrorredIcon fontSize="medium" color="error" />
                                    </IconButton>
                                </Tooltip>
                            )}

                        </Grid>

                        <Grid item container xs={5} alignItems="center">
                            <Grid item xs={10}  sx={{textAlign: "right"}}>
                                <Typography variant="body2">
                                    {new Date(post.timestamp).toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}
                                </Typography>
                                <Typography variant="body2" color="primary">
                                    {post.creator_name}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}  sx={{textAlign: "right"}}>
                                <Tooltip title="Open in full">
                                    <IconButton size="small">
                                        <OpenInFullIcon fontSize="medium" sx={{color: "gray"}} />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        )
    }

    const allPostsCards = allPosts.map((post, index) => (
        !post.is_flagged && generateCard(post, index)
    ));

    const createdPostsCards = createdPosts.map((post, index) => (
        !post.is_flagged && generateCard(post, index)
    ))

    const savedPostsCards = savedPosts.map((post, index) => (
        !post.is_flagged && generateCard(post, index)
    ))

    return (
        <React.Fragment>
            <ThemeProvider theme={themeView}>
                {!isMatch ? (
                    <Grid container spacing={0} width={"100%"} overflow={"hidden"}>
                        <Grid item xs={3} sx={{marginTop: "8vh", width: "100%", height: "auto"}}>
                            <CustomNavpanel navState={navState} setNavState={setNavState} />
                        </Grid>
                        
                        <Grid item xs={6} sx={{width: "100%", paddingX:"1%"}}>
                            <List className={style.invisiScroll} style={{marginTop: "10vh", maxHeight: "80vh", overflow: 'auto', justifyContent: "center", width: "100%", borderRadius: 3}}>
                                {navState==="Home" && allPostsCards}
                                {navState==="My Ideas" && createdPostsCards}
                                {navState==="My Collection" && savedPostsCards}
                            </List>
                        </Grid>

                        <Grid item xs={3} sx={{paddingRight: "2%", paddingLeft: "1%", marginTop: "10vh", width: "100%", height: "auto", textAlign: "center"}}>
                            <Button 
                                variant="contained" 
                                color="post" 
                                sx={{color: "white", textTransform: "capitalize", padding: "3% 10%"}}
                                onClick={handleOpen}
                            >
                                <AddIcon fontSize="small"/>
                                <Typography fontWeight={"medium"}>
                                    Post a New Idea
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                ) : (
                    <Container sx={{width: "100%"}}>
                        <CustomNavpanel navState={navState} setNavState={setNavState}/>

                        <Container sx={{textAlign: "end", position: "fixed", zIndex: 3, marginTop: "70vh", paddingRight: "8.5%"}}>
                            <Button 
                                variant="contained" 
                                color="post" 
                                sx={{color: "white", textTransform: "capitalize", borderRadius: 300}}
                                onClick={handleOpen}
                            >
                                    <AddIcon fontSize="large"/>
                            </Button>
                        </Container>

                        <Grid container spacing={0} width={"100%"} overflow={"hidden"} justifyContent="center">
                            <Grid item xs={10} sx={{width: "100%", paddingX:"1%"}}>
                                <List className={style.invisiScroll} style={{marginTop: "2vh", maxHeight: "80vh", overflow: 'auto', justifyContent: "center", width: "100%", borderRadius: 3}}>
                                    {navState==="Home" && allPostsCards}
                                    {navState==="My Ideas" && createdPostsCards}
                                    {navState==="My Collection" && savedPostsCards}
                                </List>
                            </Grid>
                        </Grid>

                        
                    </Container>
                )}
                

                <Dialog 
                    open={open} 
                    onClose={handleClose}
                    sx={{borderRadius: 7,}}
                    fullWidth
                >
                    <DialogTitle>
                        New Project Idea
                        <DialogContentText>
                            Describe your idea as best as you can!
                        </DialogContentText>
                    </DialogTitle>

                    <DialogContent>
                        <TextField
                            required
                            margin="none"
                            id="title"
                            value={title}
                            error={titleError}
                            label="Project Title"
                            type="text"
                            fullWidth
                            variant="standard"
                            color="primary"
                            inputProps={{ maxLength: 25 }}
                            helperText={`${title.length}/${25}`}
                            onChange={handleTitleChange}
                        />

                        <FormControl required sx={{ marginTop: "5%" }} color="primary" error={startedError}>
                            <FormLabel id="started"> Have you started on it? </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="Started? Radio Buttons Group Label"
                                name="started"
                                color="primary"
                                onChange={e => {setStartedValue(e.target.value); setStartedError(false)}}
                                value={startedValue}
                            >
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" onClick={handleFormOn}/>
                                <FormControlLabel value="No" control={<Radio />} label="No" onClick={handleFormOff}/>
                            </RadioGroup>
                        </FormControl>
                        {(formDisplay) &&
                            <TextField
                                required
                                disabled={!formDisplay}
                                //TODO: make error if displayed but empty
                                value={github}
                                error={formDisplay && githubError}
                                margin="none"
                                id="github"
                                label="GitHub URL"
                                type="text"
                                fullWidth
                                variant="standard"
                                placeholder="Link to your public GitHub repository"
                                color="primary"
                                onChange={handleGithubChange}
                            />
                        }
                    
                        <TextField
                            required
                            margin="none"
                            id="description"
                            value={description}
                            label="Description"
                            error={descriptionError}
                            type="text"
                            fullWidth
                            variant="standard"
                            multiline
                            rows={7}
                            placeholder="Give us all the details of your idea!"
                            inputProps={{ maxLength: 255 }}
                            helperText={`${description.length}/${255}`}
                            onChange={handleDescriptionChange}
                            sx={{marginTop: "5%"}}
                            color="primary"
                        />

                        <TextField
                            margin="none"
                            id="contact"
                            value={contact}
                            label="Contact Info (optional)"
                            error={contactError}
                            type="text"
                            fullWidth
                            variant="standard"
                            placeholder="Email"
                            sx={{marginTop: "5%"}}
                            color="primary"
                            onChange={handleContactChange}
                        />

                        {/* <FormControl required sx={{ marginTop: "5%" }}>
                            <FormLabel id="anonymous">Would you like to post anonymously?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="Anonymous? Radio Buttons Group Label"
                                name="anonymous"
                                color="primary"
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Yes"/>
                                <FormControlLabel value="no" control={<Radio />} label="No"/>
                            </RadioGroup>
                        </FormControl> */}
                    </DialogContent>
                    
                    <DialogActions>
                        <Button onClick={handleClose} color="post">
                            <Typography>
                                Cancel
                            </Typography>
                        </Button>
                        <Button onClick={handlePost} variant="contained" color="post" sx={{color: "white"}}>
                            <Typography>
                                Post
                            </Typography>
                        </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </React.Fragment>
        
    )
}