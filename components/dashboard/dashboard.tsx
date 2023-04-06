import { Box, Card, Grid, List, Paper } from "@mui/material";
import React from "react";
import style from "./dashboard.module.scss"

const CARDS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];

export default function Dashboard() {
    return (
        <React.Fragment>
            <Grid container spacing={0} width={"100%"} overflow={"hidden"} sx={{overflow: "hidden"}}>
                <Grid item xs={3} sx={{paddingTop: "10%", width: "100%", height: "auto"}}>
                    <Card>
                        xs = 3
                    </Card>
                </Grid>
                <Grid xs={6} sx={{width: "100%", paddingRight: "5%", paddingLeft: "5%",}}>
                    <List className={style.invisiScroll} style={{maxHeight: "20%", overflow: 'auto', justifyContent: "center", width: "100%", borderRadius: 3}}>
                        {CARDS.map((card, index) => (
                            <div style={{paddingTop: "10px"}}>
                                <Card key={index} sx={{height: "300px",}}>
                                    {card}
                                </Card>
                            </div>
                        ))}
                    </List>
                </Grid>
                <Grid xs={3} sx={{paddingTop: "10%", width: "100%", height: "auto"}}>
                    <Card>
                        xs = 3
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
        
    )
}