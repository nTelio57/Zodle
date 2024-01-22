using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using ScriptStoreAPI.Data;
using ScriptStoreAPI.Services;
using ScriptStoreAPI.Hubs;
using Amazon.Auth.AccessControlPolicy;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddSignalR();

builder.Services.AddControllers
    (opt => opt.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true)
    .AddNewtonsoftJson(s =>
{
    s.SerializerSettings.ContractResolver = new DefaultContractResolver();
    s.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("DefaultDatabase"));

//Transient - each access
//Scoped - per HTTP request
//Singleton - lifetime
builder.Services.AddSingleton<Database>();
builder.Services.AddTransient<IScriptStoreService, ScriptStoreService>();

builder.Services.AddCors(o => o.AddPolicy("MyPolicy", policyBuilder =>
{
    policyBuilder
        .WithOrigins()
        .AllowAnyMethod()
        .AllowAnyHeader()
        .WithMethods("GET", "POST")
        .AllowCredentials();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("MyPolicy");
app.UseHttpsRedirection();
app.UseAuthorization();

app.MapGet("/", async context =>
{
    await context.Response.WriteAsync("Hello World!");
});
app.MapHub<SworgyHub>("/sworgy");
app.MapControllers();

app.Run();
