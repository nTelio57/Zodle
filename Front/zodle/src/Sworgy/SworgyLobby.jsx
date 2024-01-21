import { Box, Button, Typography } from "@mui/material";

export default function SworgyLobby({onBeginClick}) {
const playerList = ["Vienas", "Du", "Trys", "Keturi", "Penki", "Vienas", "Du", "Trys", "Keturi", "Penki",  "Vienas", "Du", "Trys", "Keturi", "Penki"];

    return (
        <Box sx={{width: "100%", height:"100%", display:"flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center"}}>

            <Typography style={{color: "white", fontSize: "22px"}}>Room code: {"SHRGHSR"}</Typography>

            <Box sx={{ height: "60%", width: "70%", borderStyle: "solid", borderColor: "white", borderWidth: "4px", 
            borderRadius: "8px", backgroundColor: "#c93059", display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap"}}>
                
            {playerList.map((entry) => 
                  <Box sx={{backgroundColor: "white", textAlign: "center", borderRadius: "4px", minWidth: "40px", paddingLeft: "8px", paddingRight: "8px", paddingTop: "4px", paddingBottom: "6px", margin: "8px"}}>{entry}</Box>
            )}

            </Box>

            <Button variant="filled" onClick={() => onBeginClick()} style={{backgroundColor: "white", color: "#fc3d70", fontWeight: "bold", marginTop: "8px", width: "250px"}}>Begin</Button>
        </Box>
    );
}