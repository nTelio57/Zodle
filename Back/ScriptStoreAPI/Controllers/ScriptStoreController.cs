using Microsoft.AspNetCore.Mvc;
using ScriptStoreAPI.DTOs;
using ScriptStoreAPI.Services;
using System;
using static System.Net.Mime.MediaTypeNames;

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

        [HttpGet("download/{id}")]
        public async Task<IActionResult> DownloadScript(string id)
        {
            var script = await _scriptStoreService.Get(id);
            if (script == null)
                return NotFound();

            try
            {
                var fileStream = System.IO.File.OpenRead(script.ScriptPath);
                return File(fileStream, script.ContentType, Path.GetFileName(script.ScriptPath));
            }
            catch (FileNotFoundException)
            {
                await _scriptStoreService.Delete(id);
                return BadRequest("File was not found.");
            }
            catch (DirectoryNotFoundException)
            {
                await _scriptStoreService.Delete(id);
                return BadRequest("File was not found.");
            }
            catch (Exception)
            {
                return BadRequest("Failed to find file.");
            }
        }
    }
}
