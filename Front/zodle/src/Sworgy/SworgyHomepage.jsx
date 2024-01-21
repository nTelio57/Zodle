import { Box, Button, Typography } from "@mui/material";

export default function SworgyHomepage({onHostClicked, onJoinClicked}) {
    return (
        <Box sx={{ height: "100%",  display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <Typography style={{color: "white", fontSize: "48px", marginBottom: "200px"}}>SWORGY</Typography>
            <Button variant="filled" onClick={() => onHostClicked()} style={{backgroundColor: "white", color: "#fc3d70", fontWeight: "bold", marginTop: "8px"}}>Host</Button>
            <Button variant="filled" onClick={() => onJoinClicked()} style={{backgroundColor: "white", color: "#fc3d70", fontWeight: "bold", marginTop: "8px"}}>Join</Button>
        </Box>
    );
}