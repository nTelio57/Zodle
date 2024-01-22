import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function SworgyTaskCreate({onTaskCreated}) {
    const [task, setTask] = useState('');

    return (
        <Box sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Box sx={{ height: "60%", width: "80%"}}>
                <TextField multiline onChange={(change) => setTask(change.target.value)} placeholder="Create your task for someone ;)" rows={15} fullWidth style={{ backgroundColor: "white", borderRadius: "4px"}}></TextField>
            </Box>
            <Button variant="filled" onClick={() => onTaskCreated(task)} style={{backgroundColor: "white", color: "#fc3d70", fontWeight: "bold", marginTop: "8px", width: "50%"}}>Create</Button>
        </Box>
    );
}