using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using ScriptStoreAPI.Data;
using ScriptStoreAPI.DTOs;
using ScriptStoreAPI.Models;

namespace ScriptStoreAPI.Services
{
    public class ScriptStoreService : IScriptStoreService
    {
        private readonly Database _db;
        private readonly IMapper _mapper;
        private readonly IHostEnvironment _hostEnvironment;
        public ScriptStoreService(Database db, IMapper mapper, IHostEnvironment hostEnvironment)
        {
            _db = db;
            _mapper = mapper;
            _hostEnvironment = hostEnvironment;
        }

        public async Task<IEnumerable<ScriptReadDTO>> GetAll()
        {
            IEnumerable<Script> scripts = await _db.Scripts.Find(_ => true).ToListAsync();
            var scriptDtos = _mapper.Map<IEnumerable<ScriptReadDTO>>(scripts);

            return scriptDtos;
        }

        public async Task Post(ScriptCreateDTO scriptCreateDTO)
        {
            string path = await AddScriptToFileSystem(scriptCreateDTO.Script);
            var script = _mapper.Map<Script>(scriptCreateDTO);
            script.ScriptPath = path;
            script.Language = GetLanguage(path);

            await _db.Scripts.InsertOneAsync(script);

            return;
        }

        private string GetLanguage(string path)
        {
            string extension = Path.GetExtension(path);
            int index = extension.LastIndexOf('.');
            return extension.Substring(index + 1);
        }

        private async Task<string> AddScriptToFileSystem(IFormFile scriptFile)
        {
            string directory = Path.Combine(_hostEnvironment.ContentRootPath, $"ScriptStore");
            string fullPath = Path.Combine($"{directory}/{scriptFile.FileName}");

            Directory.CreateDirectory(directory);
            await using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await scriptFile.CopyToAsync(stream);
            }

            return fullPath;
        }

        private async Task<string> ScriptToText(string path)
        {
            using (StreamReader stream = new(path))
            {
                return await stream.ReadToEndAsync();
            }
        }
    }
}
