namespace ScriptStoreAPI.Entities.Sworgy
{
    public class SworgyPlayer
    {
        public string ConnectionId { get; set; }
        public string Username { get; set; }
        public string ActiveRoom { get; set; }

        public SworgyPlayer(string connectionId, string username, string activeRoom)
        {
            ConnectionId = connectionId;
            Username = username;
            ActiveRoom = activeRoom;
        }
    }
}
