using Microsoft.AspNetCore.SignalR;
using ScriptStoreAPI.Entities.Sworgy;
using System.Diagnostics;

namespace ScriptStoreAPI.Hubs
{
    public class SworgyHub : Hub
    {
        private static readonly Dictionary<string, SworgyPlayer> ConnectedUsers = [];//ConnId-User
        private static readonly Dictionary<string, SworgyRoom> ActiveRooms = [];//RoomCode-Room
        private readonly Random ran = new();

        public override async Task OnConnectedAsync()
        {
            await ForcePlayerDisconnectFromRooms();
            await base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            ForcePlayerDisconnectFromRooms();
            return base.OnDisconnectedAsync(exception);
        }

        public async Task CreateRoom(string username)
        {
            string roomCode = GenerateRoomCode();

            SworgyPlayer newPlayer = new(Context.ConnectionId, username, roomCode);
            ConnectedUsers.Add(Context.ConnectionId, newPlayer);

            ActiveRooms.Add(roomCode, new SworgyRoom(roomCode));
            ActiveRooms[roomCode].AddPlayer(newPlayer);
            
            Debug.WriteLine($"Room created {roomCode}");

            await Clients.Client(Context.ConnectionId).SendAsync("OnRoomCreated", roomCode);
            await Clients.Client(Context.ConnectionId).SendAsync("OnPlayerJoined", username);
        }

        public async Task JoinRoom(string username, string roomCode)
        {
            SworgyPlayer newPlayer = new(Context.ConnectionId, username, roomCode);
            ConnectedUsers.Add(Context.ConnectionId, newPlayer);

            var room = ActiveRooms[roomCode];
            room.AddPlayer(newPlayer);

            await Clients.Clients(room.Players.Where(x => x.ConnectionId != Context.ConnectionId).Select(x => x.ConnectionId)).SendAsync("OnPlayerJoined", username);

            List<string> allUsernames = room.Players.Select(x => x.Username).ToList();
            await Clients.Client(Context.ConnectionId).SendAsync("OnRoomJoined", allUsernames);
        }

        public async Task StartGame()
        {
            var connectedPlayer = ConnectedUsers[Context.ConnectionId];
            var room = ActiveRooms[connectedPlayer.ActiveRoom];

            await Clients.Clients(room.Players.Select(x => x.ConnectionId)).SendAsync("OnGameStarted");
        }

        public async Task CreateDare(string dare)
        {
            var connectedPlayer = ConnectedUsers[Context.ConnectionId];
            var room = ActiveRooms[connectedPlayer.ActiveRoom];

            room.AddDare(new SworgyDare(connectedPlayer, dare));

            if(room.Dares.Count == room.Players.Count)
            {
                room.AssignDares();
                await Clients.Clients(room.Players.Select(x => x.ConnectionId)).SendAsync("OnDareStart", room.Dares[0]);
            }
            else
            {
                var playersWaiting = room.Players.Where(x => room.IsWaiting(x.ConnectionId)).Select(x => x.ConnectionId).ToList();
                var playersCreating = room.Players.Where(x => !room.IsWaiting(x.ConnectionId)).Select(x => x.Username).ToList();

                await Clients.Clients(playersWaiting).SendAsync("OnWaitingForDares", playersCreating);
            }
        }

        public async Task CompleteDare()
        {
            var connectedPlayer = ConnectedUsers[Context.ConnectionId];
            var room = ActiveRooms[connectedPlayer.ActiveRoom];
            room.CompleteDare(connectedPlayer.ConnectionId);

            if(room.Dares.Count > 0)//More dares left
            {
                await Clients.Clients(room.Players.Select(x => x.ConnectionId)).SendAsync("OnDareStart", room.Dares[0]);
            }
            else//Dares finished
            {
                await Clients.Clients(room.Players.Select(x => x.ConnectionId)).SendAsync("OnGameFinished");
            }
        }

        private async Task ForcePlayerDisconnectFromRooms()
        {
            if (!ConnectedUsers.ContainsKey(Context.ConnectionId)) return;
            var connectedPlayer = ConnectedUsers[Context.ConnectionId];

            if (!ActiveRooms.ContainsKey(connectedPlayer.ActiveRoom)) return;
            var room = ActiveRooms[connectedPlayer.ActiveRoom];

            room.RemovePlayer(Context.ConnectionId);

            await Clients.Clients(room.Players.Where(x => x.ConnectionId != Context.ConnectionId).Select(x => x.ConnectionId)).SendAsync("OnPlayerLeft", connectedPlayer.Username);

            if (room.Players.Count <= 0)
            {
                ActiveRooms.Remove(connectedPlayer.ActiveRoom);
            }

            ConnectedUsers.Remove(Context.ConnectionId);
        }

        private string GenerateRoomCode()
        {
            string chars = "123456789";
            int length = 6;
            string code = "";

            for(int i =  0; i < length; i++)
            {
                code += chars[ran.Next(chars.Length)];
            }

            if(ActiveRooms.ContainsKey(code))
            {
                code = GenerateRoomCode();
            }
            return code;
        }
    }
}
