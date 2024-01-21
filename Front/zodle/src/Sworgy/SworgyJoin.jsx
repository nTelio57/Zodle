import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function SworgyJoin({onJoinClicked}) {
    const [roomCode, setRoomCode] = useState('');

    return (
        <Box sx={{ height: "100%",  display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <TextField placeholder="Room code" onChange={(change) => setRoomCode(change.target.value)} style={{backgroundColor: "white", borderRadius: "4px"}}></TextField>
            <Button variant="filled" onClick={() => onJoinClicked(roomCode)} style={{backgroundColor: "white", color: "#fc3d70", fontWeight: "bold", marginTop: "8px"}}>Join</Button>
        </Box>
    );
}