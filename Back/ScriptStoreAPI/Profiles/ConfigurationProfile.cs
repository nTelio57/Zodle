using AutoMapper;

namespace ScriptStoreAPI.Profiles
{
    public class ConfigurationProfile
    {
        public MapperConfiguration Configure()
        {
            var config = new MapperConfiguration(x =>
            {
                x.AddProfile<ScriptProfile>();
            });
            return config;
        }
    }
}
