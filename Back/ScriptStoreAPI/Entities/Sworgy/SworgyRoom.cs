namespace ScriptStoreAPI.Entities.Sworgy
{
    public class SworgyRoom
    {
        private readonly Random ran = new();

        public string RoomCode { get; set; }
        public List<SworgyPlayer> Players { get; set; }
        public List<SworgyDare> Dares { get; set; }

        public SworgyRoom(string roomCode)
        {
            RoomCode = roomCode;
            Players = [];
            Dares = [];
        }

        public void AddPlayer(SworgyPlayer player)
        {
            Players.Add(player);
        }

        public void RemovePlayer(string connectionId)
        {
            Players.RemoveAll(x => x.ConnectionId == connectionId);
        }

        public void ClearDares()
        {
            Dares.Clear();
        }

        public void AddDare(SworgyDare dare)
        {
            Dares.Add(dare);
        }

        public void CompleteDare(string asigneeId)
        {
            Dares.RemoveAll(x => x.Asignee.ConnectionId == asigneeId);
        }

        public bool IsWaiting(string connectionId)
        {
            return Dares.Select(x => x.Creator.ConnectionId).Contains(connectionId);
        }

        public void AssignDares()
        {
            var playerOrder = Players.OrderBy(x => ran.Next()).ToList();

            foreach (SworgyDare dare in Dares)
            {
                SworgyPlayer asignee = playerOrder.FirstOrDefault(x => x.ConnectionId != dare.Creator.ConnectionId);

                if (asignee != null)
                {
                    dare.Asignee = asignee;
                    playerOrder.RemoveAll(x => x.ConnectionId == asignee.ConnectionId);
                }
            }

            Dares = Dares.OrderBy(x => ran.Next()).ToList();
        }
    }
}
