using Nest;
using signalrtimezone.Helpers;
using signalrtimezone.Hubs;
using signalrtimezone.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers(options =>
{
    options.Filters.Add<TimeZoneHelper>();
});

var elasticSettings = new ConnectionSettings(new Uri("http://localhost:9200"))
       .DefaultIndex("timezones").BasicAuthentication("elastic", "123Asd!!");

var elasticClient = new ElasticClient(elasticSettings);

builder.Services.AddSingleton<IElasticClient>(elasticClient);

builder.Services.AddSingleton<ITimeZoneService, TimeZoneService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", builder => builder.WithOrigins("http://localhost:3000", "https://localhost:3000", "http://localhost:3001", "https://localhost:3001").AllowAnyHeader().AllowAnyMethod());
});

builder.Services.AddSignalR();

var app = builder.Build();

app.UseCors("AllowOrigin");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<TimeZoneHub>("/timeZoneHub");
});

app.MapControllers();

app.Run();
