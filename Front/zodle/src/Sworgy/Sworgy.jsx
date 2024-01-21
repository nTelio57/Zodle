import { Box } from "@mui/material";
import SworgyHomepage from "./SworgyHomepage";
import SworgyLobby from "./SworgyLobby";
import SworgyLogin from "./SworgyLogin";
import SworgyTaskCreate from "./SworgyTaskCreate";
import SworgyTaskAction from "./SworgyTaskAction";
import SworgyJoin from "./SworgyJoin";
import { useState } from "react";

export default function Sworgy() {
    const [gameState, setGameState] = useState(0);

    const handleHost = () => {
        setGameState(1);
    }

    const handleLogin = (username) => {
        console.log("Joining with " + username);
        setGameState(3);
    }

    const handleJoin = (roomCode) => {
        console.log("Joining room " + roomCode);
        setGameState(1);
    }

    const handleTaskCreated = (task) => {
        console.log("Task created " + task);
    }

    let gameStateView;
    switch(gameState){
        case 0: gameStateView = <SworgyHomepage onHostClicked={() => setGameState(1)} onJoinClicked={() => setGameState(2)} />; break;
        case 1: gameStateView = <SworgyLogin onLoginClicked={handleLogin}/>; break;
        case 2: gameStateView = <SworgyJoin onJoinClicked={handleJoin}/>; break;
        case 3: gameStateView = <SworgyLobby onBeginClick={() => setGameState(4)}/>; break;
        case 4: gameStateView = <SworgyTaskCreate onTaskCreated={handleTaskCreated}/>; break;
        case 5: gameStateView = <SworgyTaskAction/>; break;
    }

    return (
        <Box sx={{height: "100vh", width: "100vw", background: "#fc3d70", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            {gameStateView}
        </Box>
    );
}