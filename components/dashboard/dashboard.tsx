import { 
    Box, 
    Button, 
    Card, 
    Grid, 
    List, 
    PaletteColorOptions, 
    Paper, 
    ThemeProvider, 
    Typography, 
    createTheme 
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React from "react";
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

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
    palette: {
        post: createColor('#DF9090'),
    },
});


export default function Dashboard() {
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Grid container spacing={0} width={"100%"} overflow={"hidden"}>
                    <Grid item xs={3} sx={{marginTop: "8vh", width: "100%", height: "auto"}}>
                        <CustomNavpanel />
                    </Grid>
                    
                    <Grid xs={6} sx={{width: "100%", paddingX:"1%"}}>
                        <List className={style.invisiScroll} style={{marginTop: "10vh", maxHeight: "80vh", overflow: 'auto', justifyContent: "center", width: "100%", borderRadius: 3}}>
                            {CARDS.map((card, index) => (
                                <div style={{paddingTop: "10px"}}>
                                    <Card key={index} sx={{height: "300px",}}>
                                        {card}
                                    </Card>
                                </div>
                            ))}
                        </List>
                    </Grid>

                    <Grid xs={3} sx={{paddingRight: "2%", paddingLeft: "1%", marginTop: "10vh", width: "100%", height: "auto", textAlign: "center"}}>
                        <Button variant="contained" color="post" sx={{color: "white", textTransform: "capitalize", padding: "3% 10%"}}>
                            <AddIcon fontSize="small"/>
                            <Typography fontWeight={"medium"}>
                                Post a New Idea
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </React.Fragment>
        
    )
}