using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace ScriptStoreAPI.Models
{
    public class Script
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string[] Tags { get; set; }
        public string ScriptPath { get; set; }

        public string ScriptToText()
        {
            using (StreamReader stream = new(ScriptPath))
            {
                return stream.ReadToEnd();
            }
        }
    }
}
