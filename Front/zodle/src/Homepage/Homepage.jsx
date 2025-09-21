import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Homepage()
{
    const navigate = useNavigate();

    return (
        <Box sx={{height: "100vh", width: "100vw", background: "#5384a2", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <Button variant="filled" onClick={() => navigate("/Sworgy")} style={{backgroundColor: "white", color: "#5384a2", fontWeight: "bold", marginRight: "8px"}}>Sworgy</Button>
            <Button variant="filled" onClick={() => navigate("/ScriptStore")} style={{backgroundColor: "white", color: "#5384a2", fontWeight: "bold", marginLeft: "8px"}}>Script Store</Button>
        </Box>
    );
}