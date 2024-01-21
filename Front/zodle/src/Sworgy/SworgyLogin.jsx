import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function SworgyLogin({onLoginClicked}) {
    const [username, setUsername] = useState('');

    return (
        <Box sx={{ height: "100%",  display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <TextField placeholder="Your name" onChange={(change) => setUsername(change.target.value)} style={{backgroundColor: "white", borderRadius: "4px"}}></TextField>
            <Button variant="filled" onClick={() => onLoginClicked(username)} style={{backgroundColor: "white", color: "#fc3d70", fontWeight: "bold", marginTop: "8px"}}>Continue</Button>
        </Box>
    );
}