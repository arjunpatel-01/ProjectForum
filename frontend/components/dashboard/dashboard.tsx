import { 
    Button, 
    Container, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    Grid, 
    List, 
    PaletteColorOptions, 
    Radio, 
    RadioGroup, 
    TextField, 
    ThemeProvider, 
    Typography, 
    createTheme,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React, { useCallback, useEffect, useState } from "react";
import style from "./dashboard.module.scss"
import CustomNavpanel from "../navpanel/navpanel";
import { useUser } from "@descope/react-sdk";
import User from "@/utils/models";
import PostCard from "./postCard"
import * as EmailValidator from 'email-validator';

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

    const [postModalDisplay, setPostModalDisplay] = useState(false);
    const [githubFormDisplay, setGithubFormDisplay] = useState(false);
    
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
    const [testAll, setTestAll] = useState({} as any);
    const [createdPosts, setCreatedPosts] = useState([] as any[]);
    const [testCreated, setTestCreated] = useState({} as any);
    const [savedPosts, setSavedPosts] = useState([] as any[]);
    const [testSaved, setTestSaved] = useState({} as any);
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

    function updatePostsArrays() {
        getAllPosts().then((posts) => {
            setAllPosts(posts);
            let testArrObj: any = {};
            posts.forEach((post: any) => {
                testArrObj[post.id] = post
            })
            setTestAll(testArrObj);
        });

        getSavedPosts().then((posts) => {
            setSavedPosts(posts);
            let testArrObj: any = {};
            posts.forEach((post: any) => {
                testArrObj[post.id] = post
            })
            setTestSaved(testArrObj);
        });

        getCreatedPosts().then((posts) => {
            setCreatedPosts(posts);
            let testArrObj: any = {};
            posts.forEach((post: any) => {
                testArrObj[post.id] = post
            })
            setTestCreated(testArrObj);
        });
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

        if (title === "" || startedValue === "" || description === "" || (githubFormDisplay && !validGithub) || ((contact !== "" && contact !== null && contact !== undefined) && !validContact)) {
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

            updatePostsArrays();

            handlePostModalClose();
        }
    }

    const handlePostModalOpen = () => {
        setPostModalDisplay(true);
    }

    const handlePostModalClose = () => {
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

        setPostModalDisplay(false);
        setGithubFormDisplay(false);
    }

    const handleGithubFormOn = () => {
        setGithubFormDisplay(true);
    }

    const handleGithubFormOff = () => {
        setGithubFormDisplay(false); 
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
        updatePostsArrays();
    }, [getAllPosts, getCreatedPosts, getSavedPosts, updatePostsArrays, navState]);

    const allPostsCards = allPosts.map((post, index) => (
        !post.is_flagged && 
            <PostCard 
                key={index}
                post={post} 
                index={index} 
                updatePostsArrays={updatePostsArrays} 
                savedPosts={savedPosts}
            />
    ));

    const allTestCards = Object.keys(testAll).map((property, index) => (
        !testAll[property].is_flagged &&
            <PostCard 
                key={index}
                post={testAll[property]} 
                index={index} 
                updatePostsArrays={updatePostsArrays} 
                savedPosts={testSaved}
            />
    ))

    const createdPostsCards = createdPosts.map((post, index) => (
        !post.is_flagged && 
            <PostCard
                key={index}
                post={post} 
                index={index} 
                updatePostsArrays={updatePostsArrays} 
                savedPosts={savedPosts}
            />
    ))

    const createdTestCards = Object.keys(testCreated).map((property, index) => (
        !testCreated[property].is_flagged &&
            <PostCard 
                key={index}
                post={testAll[property]} 
                index={index} 
                updatePostsArrays={updatePostsArrays} 
                savedPosts={testSaved}
            />
    ))

    const savedPostsCards = savedPosts.map((post, index) => (
        !post.is_flagged &&
            <PostCard 
                key={index}
                post={post} 
                index={index} 
                updatePostsArrays={updatePostsArrays} 
                savedPosts={savedPosts}
            />
    ))

    const savedTestCards = Object.keys(testSaved).map((property, index) => (
        !testSaved[property].is_flagged &&
            <PostCard 
                key={index}
                post={testAll[property]} 
                index={index} 
                updatePostsArrays={updatePostsArrays} 
                savedPosts={testSaved}
            />
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
                                {navState==="Home" && allTestCards}
                                {navState==="My Ideas" && createdTestCards}
                                {navState==="My Collection" && savedTestCards}
                            </List>
                        </Grid>

                        <Grid item xs={3} sx={{paddingRight: "2%", paddingLeft: "1%", marginTop: "10vh", width: "100%", height: "auto", textAlign: "center"}}>
                            <Button 
                                variant="contained" 
                                color="post" 
                                sx={{color: "white", textTransform: "capitalize", padding: "3% 10%"}}
                                onClick={handlePostModalOpen}
                            >
                                <AddIcon fontSize="small"/>
                                <Typography fontWeight={"medium"}>
                                    Post a New Idea
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                ) : (
                    /*
                    ////////////////////////////////////////////////////////////////
                    /////////////////////////////MOBILE/////////////////////////////
                    ////////////////////////////////////////////////////////////////
                    */
                    <Container sx={{width: "100%"}}>
                        <CustomNavpanel navState={navState} setNavState={setNavState}/>

                        <Container sx={{textAlign: "end", position: "fixed", zIndex: 3, marginTop: "70vh", paddingRight: "8.5%"}}>
                            <Button 
                                variant="contained" 
                                color="post" 
                                sx={{color: "white", textTransform: "capitalize", borderRadius: 300}}
                                onClick={handlePostModalOpen}
                            >
                                    <AddIcon fontSize="large"/>
                            </Button>
                        </Container>

                        <Grid container spacing={0} width={"100%"} overflow={"hidden"} justifyContent="center">
                            <Grid item xs={10} sx={{width: "100%", paddingX:"1%"}}>
                                <List className={style.invisiScroll} style={{marginTop: "2vh", maxHeight: "80vh", overflow: 'auto', justifyContent: "center", width: "100%", borderRadius: 3}}>
                                    {navState==="Home" && allTestCards}
                                    {navState==="My Ideas" && createdTestCards}
                                    {navState==="My Collection" && savedTestCards}
                                </List>
                            </Grid>
                        </Grid>

                        
                    </Container>
                )}
                

                <Dialog 
                    open={postModalDisplay} 
                    onClose={handlePostModalClose}
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
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" onClick={handleGithubFormOn}/>
                                <FormControlLabel value="No" control={<Radio />} label="No" onClick={handleGithubFormOff}/>
                            </RadioGroup>
                        </FormControl>
                        {(githubFormDisplay) &&
                            <TextField
                                required
                                disabled={!githubFormDisplay}
                                //TODO: make error if displayed but empty
                                value={github}
                                error={githubFormDisplay && githubError}
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
                        <Button onClick={handlePostModalClose} color="post">
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