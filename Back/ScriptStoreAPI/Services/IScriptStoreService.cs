using ScriptStoreAPI.DTOs;

namespace ScriptStoreAPI.Services
{
    public interface IScriptStoreService
    {
        Task<IEnumerable<ScriptReadDTO>> GetAll();
        Task Post(ScriptCreateDTO scriptCreateDTO);
    }
}
