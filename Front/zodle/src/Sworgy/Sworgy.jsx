import { Box } from "@mui/material";
import SworgyHomepage from "./SworgyHomepage";
import SworgyLobby from "./SworgyLobby";
import SworgyLogin from "./SworgyLogin";
import SworgyTaskCreate from "./SworgyTaskCreate";
import SworgyTaskAction from "./SworgyTaskAction";
import SworgyJoin from "./SworgyJoin";
import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import SworgyWaitList from "./SworgyWaitList";

export default function Sworgy() {
    const [isHost, setHost] = useState(false);
    const [username, setUsername] = useState("");
    const [gameState, setGameState] = useState(0);
    const [roomCode, setRoomCode] = useState("");
    const [connection, setConnection] = useState(null);
    const [playerList, setPlayerList] = useState([]);
    const [currentTask, setCurrentTask] = useState("");
    const [currentAsignee, setCurrentAsignee] = useState("");
    const [creatorsList, setCreatorsList] = useState([]);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Debug)
        .withUrl(process.env.REACT_APP_WEBSOCKET_URL, {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        })
        .build();

        connection.start().then(() => {
            console.log('SignalR Connected');
          }).catch((error) => {
            console.error('SignalR Connection Error: ', error);
          });

        connection.on("onroomcreated", newRoomCode => {
            setRoomCode(newRoomCode);
            setGameState(3);
        });

        connection.on("onroomjoined", allPlayers => {
            setPlayerList(allPlayers);
            setGameState(3);
        });

        connection.on("onplayerjoined", username => {
            setPlayerList((oldPlayerList) => [
                ...oldPlayerList,
                username
            ]);
        });

        connection.on("onplayerleft", username => {
            setPlayerList((oldPlayerList) => oldPlayerList.filter(x => x !== username));
        });

        connection.on("ongamestarted", data => {
            setGameState(4);
        });

        connection.on("onwaitingfordares", creators => {
            setCreatorsList(creators);
            setGameState(6);
        });

        connection.on("ondarestart", data => {
            setCurrentTask(data.dare);
            setCurrentAsignee(data.asignee.username);
            setGameState(5);
        });

        connection.on("ongamefinished", data => {
            setGameState(3);
        });
        
        connection.onclose(async () => {
            setGameState(0);
        });

        setConnection(connection);

        return () => {
            connection.stop();
          };
    }, []);

    const handleHostStart = () => {
        setHost(true);
        setGameState(1);
    }

    const handleJoinStart = () => {
        setHost(false);
        setGameState(2);
    }
    
    const handleLogin = (username) => {
        setUsername(username);

        if(isHost)
        {
            connection.invoke("CreateRoom", username);
        }
        else
        {
            connection.invoke("JoinRoom", username, roomCode);
        }
    }

    const handleJoin = (roomCode) => {
        setRoomCode(roomCode);
        setGameState(1);
    }

    const handleTaskCreated = (task) => {
        connection.invoke("CreateDare", task);
    }

    const handleBegin = () => {
        if(isHost)
        {
            connection.invoke("StartGame");
        }
    }

    const handleDareCompleted = () => {
        console.log("Completing dare");
        connection.invoke("CompleteDare");
    }

    let gameStateView;
    switch(gameState){
        case 0: gameStateView = <SworgyHomepage onHostClicked={() => handleHostStart()} onJoinClicked={() => handleJoinStart()} />; break;
        case 1: gameStateView = <SworgyLogin onLoginClicked={handleLogin}/>; break;
        case 2: gameStateView = <SworgyJoin onJoinClicked={handleJoin}/>; break;
        case 3: gameStateView = <SworgyLobby onBeginClick={handleBegin} roomCode={roomCode} isHost={isHost} playerList={playerList}/>; break;
        case 4: gameStateView = <SworgyTaskCreate onTaskCreated={handleTaskCreated}/>; break;
        case 5: gameStateView = <SworgyTaskAction task={currentTask} asignee={currentAsignee} canComplete={username===currentAsignee} onCompleteClicked={handleDareCompleted}/>; break;
        case 6: gameStateView = <SworgyWaitList playerList={creatorsList}/>; break;
    }

    return (
        <Box sx={{height: "100vh", width: "100vw", background: "#fc3d70", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            {gameStateView}
        </Box>
    );
}