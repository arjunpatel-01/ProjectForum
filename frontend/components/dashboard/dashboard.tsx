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
import React, { useState } from "react";
import style from "./dashboard.module.scss"
import CustomNavpanel from "../navpanel/navpanel";


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

export default function Dashboard() {

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    const [open, setOpen] = useState(false);
    const [formDisplay, setFormDisplay] = useState(false);
    const [description, setDescription] = useState("");

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setDescription(event.target.value);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setFormDisplay(false);
        setDescription("");
    }

    const handleFormOn = () => {
        setFormDisplay(true);
    }

    const handleFormOff = () => {
        setFormDisplay(false);
    }

    return (
        <React.Fragment>
            <ThemeProvider theme={themeView}>
                {!isMatch ? (
                    <Grid container spacing={0} width={"100%"} overflow={"hidden"}>
                        <Grid item xs={3} sx={{marginTop: "8vh", width: "100%", height: "auto"}}>
                            <CustomNavpanel />
                        </Grid>
                        
                        <Grid item xs={6} sx={{width: "100%", paddingX:"1%"}}>
                            <List className={style.invisiScroll} style={{marginTop: "10vh", maxHeight: "80vh", overflow: 'auto', justifyContent: "center", width: "100%", borderRadius: 3}}>
                                {CARDS.map((card, index) => (
                                    <div key={index} style={{paddingTop: "10px"}}>
                                        <Card sx={{height: "300px",}}>
                                            {card}
                                        </Card>
                                    </div>
                                ))}
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
                        <CustomNavpanel />

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
                                    {CARDS.map((card, index) => (
                                        <div key={index} style={{paddingTop: "10px"}}>
                                            <Card sx={{height: "300px",}}>
                                                {card}
                                            </Card>
                                        </div>
                                    ))}
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
                            label="Project Title"
                            type="text"
                            fullWidth
                            variant="standard"
                            color="primary"
                        />

                        <FormControl required sx={{ marginTop: "5%" }} color="primary">
                            <FormLabel id="started"> Have you started on it? </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="Started? Radio Buttons Group Label"
                                name="started"
                                color="primary"
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" onClick={handleFormOn}/>
                                <FormControlLabel value="no" control={<Radio />} label="No" onClick={handleFormOff}/>
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
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            multiline
                            rows={7}
                            placeholder="Give us all the details of your idea!"
                            inputProps={{ maxLength: 500, color: "green" }}
                            helperText={`${description.length}/${500}`}
                            onChange={handleChange}
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
                        <Button onClick={handleClose} variant="contained" color="post" sx={{color: "white"}}>
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