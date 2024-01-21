import { Box, Button, TextField, Typography } from "@mui/material";

export default function SworgyTaskAction() {
    return (
        <Box sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>

            <Typography style={{color: "white", fontSize: "24px", fontWeight:"bold", marginBottom: "50px"}}>{"You are completing your task!"}</Typography>
            
            <Box overflow="auto" sx={{ height: "60%", width: "80%", wordWrap: "break-word"}}>
                <Typography style={{color: "white", fontSize: "20px"}}>{"Task placeholder"}</Typography>
            </Box>

            <Button variant="filled" style={{backgroundColor: "white", color: "#fc3d70", fontWeight: "bold", marginTop: "8px", width: "50%", marginTop: "40px"}}>Completed</Button>
        </Box>
    );
}