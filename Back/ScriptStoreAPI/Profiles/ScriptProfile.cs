using AutoMapper;
using ScriptStoreAPI.DTOs;
using ScriptStoreAPI.Models;

namespace ScriptStoreAPI.Profiles
{
    public class ScriptProfile : Profile
    {
        public ScriptProfile()
        {
            CreateMap<ScriptCreateDTO, Script>();
            CreateMap<Script, ScriptReadDTO>().ForMember(dest => dest.Script, opt => opt.MapFrom(source => source.ScriptToText()));
        }
    }
}
