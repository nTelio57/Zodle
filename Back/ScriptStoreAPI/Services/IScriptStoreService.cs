using ScriptStoreAPI.DTOs;

namespace ScriptStoreAPI.Services
{
    public interface IScriptStoreService
    {
        Task<ScriptReadDTO> Get(string id);
        Task<IEnumerable<ScriptReadDTO>> GetAll();
        Task Post(ScriptCreateDTO scriptCreateDTO);
        Task<bool> Delete(string id);
    }
}
