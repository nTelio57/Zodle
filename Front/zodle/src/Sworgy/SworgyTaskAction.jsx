import { Box, Button, TextField, Typography } from "@mui/material";

export default function SworgyTaskAction({task, asignee, canComplete, onCompleteClicked}) {
    return (
        <Box sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>

            <Typography style={{color: "white", fontSize: "24px", fontWeight:"bold", marginBottom: "50px"}}>{`${asignee}'s turn to complete the task!`}</Typography>
            
            <Box overflow="auto" sx={{ height: "60%", width: "80%", wordWrap: "break-word"}}>
                <Typography style={{color: "white", fontSize: "20px"}}>{task}</Typography>
            </Box>
            
            <Box visibility={canComplete ? 'visible' : 'hidden'}>
                <Button variant="filled" onClick={onCompleteClicked} style={{backgroundColor: "white", color: "#fc3d70", fontWeight: "bold", marginTop: "8px", width: "250px", marginTop: "40px"}}>Completed</Button>
            </Box>
        </Box>
    );
}