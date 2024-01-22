import { Box, Button, Hidden, Typography } from "@mui/material";

export default function SworgyWaitList({playerList}) {

    return (
        <Box sx={{width: "100%", height:"100%", display:"flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center"}}>

            <Typography style={{color: "white", fontSize: "22px"}}>Waiting for these players to create their dares:</Typography>

            <Box sx={{ height: "60%", width: "70%", borderStyle: "solid", borderColor: "white", borderWidth: "4px", 
            borderRadius: "8px", backgroundColor: "#c93059", display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap"}}>
                
                {playerList.map((entry) => 
                    <Box sx={{backgroundColor: "white", textAlign: "center", borderRadius: "4px", minWidth: "40px", paddingLeft: "8px", paddingRight: "8px", paddingTop: "4px", paddingBottom: "6px", margin: "8px"}}>{entry}</Box>
                )}

            </Box>
        </Box>
    );
}