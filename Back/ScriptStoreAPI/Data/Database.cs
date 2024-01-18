using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ScriptStoreAPI.Models;

namespace ScriptStoreAPI.Data
{
    public class Database
    {
        public readonly IMongoCollection<Script> Scripts;

        public Database(IOptions<DatabaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);

            Scripts = mongoDatabase.GetCollection<Script>(databaseSettings.Value.CollectionName);
        }
    }
}
