namespace ScriptStoreAPI.DTOs
{
    public class ScriptReadDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string[] Tags { get; set; }
        public string Language { get; set; }
        public string Script { get; set; }
    }
}
