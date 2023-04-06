import { Card, Grid, List, Paper } from "@mui/material";
import React from "react";
import style from "./dashboard.module.scss"

export default function Dashboard() {
    return (
        <React.Fragment>
            <Grid container spacing={0} width={"100%"} overflow={"hidden"} sx={{overflow: "hidden"}}>
                <Grid xs={3} sx={{paddingTop: "20rem", width: "100%"}}>
                    <Card>
                        xs = 3
                    </Card>
                </Grid>
                <Grid xs={6} sx={{width: "100%"}}>
                    <List className={style.example} style={{maxHeight: "85vh", overflow: 'auto',}}>
                        <Card sx={{height: "300px", marginTop: "10px"}}>
                            xs = 6
                        </Card>
                        <Card sx={{height: "300px", marginTop: "10px"}}>
                            xs = 6
                        </Card>
                        <Card sx={{height: "300px", marginTop: "10px"}}>
                            xs = 6
                        </Card>
                        <Card sx={{height: "300px", marginTop: "10px"}}>
                            xs = 6
                        </Card>
                    </List>
                </Grid>
                <Grid xs={3} sx={{paddingTop: "10rem", width: "100%"}}>
                    <Card>
                        xs = 3
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
        
    )
}