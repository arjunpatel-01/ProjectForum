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
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    Grid, 
    List, 
    Modal, 
    PaletteColorOptions, 
    Paper, 
    Radio, 
    RadioGroup, 
    TextField, 
    ThemeProvider, 
    Typography, 
    createTheme,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import React, { useCallback, useEffect, useState } from "react";
import style from "./dashboard.module.scss"
import CustomNavpanel from "../navpanel/navpanel";
import { useUser } from "@descope/react-sdk";
import User from "@/utils/models";


const CARDS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

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

let testUser: User;

export default function Dashboard() {
    const { user, isUserLoading } = useUser();
    if (!isUserLoading){
        testUser = {
            name: user?.name!,
            email: user?.email!,
            userId: user?.userId
        }
    }

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    const [open, setOpen] = useState(false);
    const [formDisplay, setFormDisplay] = useState(false);

    const [title, setTitle] = useState("");
    const [startedValue, setStartedValue] = useState("");
    const [description, setDescription] = useState("");

    const [titleError, setTitleError] = useState(false);
    const [startedError, setStartedError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

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

    const handleOpen = () => {
        setOpen(true);
    }

    const handlePost = async () => {
        //get all document data
        // var title = (document.getElementById("title") as HTMLInputElement | null)?.value;
        console.log("title: ", title);
        console.log("started value: ", startedValue==="Yes");
        var github = (document.getElementById("github") as HTMLInputElement | null)?.value;
        console.log("github: ", github);
        // var description = (document.getElementById("description") as HTMLInputElement | null)?.value;
        console.log("description: ", description);
        var contact = (document.getElementById("contact") as HTMLInputElement | null)?.value !== "" ? (document.getElementById("contact") as HTMLInputElement | null)?.value : undefined;
        console.log("contact: ", contact);

        if (title === "" || startedValue === "" || description === "") {
            setTitleError(title==="");
            setStartedError(startedValue==="");
            setDescriptionError(description==="");
        } else {
            const request = await fetch('/api/users/'+testUser.userId+"/post", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title,
                    is_started: startedValue==="Yes",
                    github_url: github,
                    description: description,
                    contact_info: contact,
                })
            });
            const response = await request.json();
            console.log("response: ", response);

            getAllPosts().then((posts) => {
                setAllPosts(posts);
            });
            handleClose();
        }
    }

    const handleClose = () => {
        setTitleError(false);
        setStartedError(false);
        setDescriptionError(false);

        setTitle("");
        setStartedValue("");
        setDescription("");

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
        const response = await fetch('/api/users/'+testUser!.userId!+'/creations', {
            method: 'GET'
        });
        const response_body = await response.json();
        if(response.status !== 200){ return []; }
        return response_body;
    }, []);

    const getSavedPosts = useCallback(async () => {
    const response = await fetch('/api/users/'+testUser!.userId!+'/saved', {
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

    const allPostsCards = allPosts.map((post, index) => (
        <div key={index} style={{paddingTop: "10px"}}>
            <Card sx={{height: "300px",}}>
                {post.title} 
                <p>
                    {post.creator_name}
                </p>
            </Card>
        </div>
    ));

    const createdPostsCards = createdPosts.map((post, index) => (
        <div key={index} style={{paddingTop: "10px"}}>
            <Card sx={{height: "300px",}}>
                {post.title}
                <p>
                    {post.creator_name}
                </p>
            </Card>
        </div>
    ))

    const savedPostsCards = savedPosts.map((post, index) => (
        <div key={index} style={{paddingTop: "10px"}}>
            <Card sx={{height: "300px",}}>
                {post.title}
                <p>
                    {post.creator_name}
                </p>
            </Card>
        </div>
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
                                    {allPostsCards}
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
                                // error
                                // onError={}
                                required
                                disabled={!formDisplay}
                                margin="none"
                                id="github"
                                label="GitHub URL"
                                type="text"
                                fullWidth
                                variant="standard"
                                placeholder="Link to your public GitHub repository"
                                color="primary"
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
                            inputProps={{ maxLength: 500, color: "green" }}
                            helperText={`${description.length}/${500}`}
                            onChange={handleDescriptionChange}
                            sx={{marginTop: "5%"}}
                            color="primary"
                        />

                        <TextField
                            // autoFocus
                            margin="none"
                            id="contact"
                            label="Contact Info (optional)"
                            type="text"
                            fullWidth
                            variant="standard"
                            placeholder="Email or Discord Handle"
                            sx={{marginTop: "5%"}}
                            color="primary"
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