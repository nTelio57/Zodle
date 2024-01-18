namespace ScriptStoreAPI.DTOs
{
    public class ScriptCreateDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string[] Tags { get; set; }
        public IFormFile Script { get; set; }
    }
}
