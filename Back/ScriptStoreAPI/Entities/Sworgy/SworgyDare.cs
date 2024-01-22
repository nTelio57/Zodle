namespace ScriptStoreAPI.Entities.Sworgy
{
    public class SworgyDare
    {
        public string Dare { get; set; }
        public SworgyPlayer Creator { get; set; }
        public SworgyPlayer Asignee { get; set; }

        public SworgyDare(SworgyPlayer creator, string dare)
        {
            Creator = creator;
            Dare = dare;
        }
    }
}
