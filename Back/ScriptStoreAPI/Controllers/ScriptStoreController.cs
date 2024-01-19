using Microsoft.AspNetCore.Mvc;
using ScriptStoreAPI.DTOs;
using ScriptStoreAPI.Services;

namespace ScriptStoreAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScriptStoreController : ControllerBase
    {
        private readonly IScriptStoreService _scriptStoreService;
        public ScriptStoreController(IScriptStoreService scriptStoreService)
        {
            _scriptStoreService = scriptStoreService;
        }

        [HttpPost]
        public async Task Post([FromForm]ScriptCreateDTO scriptCreateDTO)
        {
            await _scriptStoreService.Post(scriptCreateDTO);
        }

        [HttpGet]
        public async Task<IEnumerable<ScriptReadDTO>> Get()
        {
            return await _scriptStoreService.GetAll();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (await _scriptStoreService.Delete(id))
                return NoContent();
            return BadRequest();
        }
    }
}
