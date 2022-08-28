using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Premier.Data;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<PremierContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("PremierContext") ?? throw new InvalidOperationException("Connection string 'PremierContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connection = builder.Configuration.GetConnectionString("PremierContext");
builder.Services.AddDbContext<PremierContext>(options => options.UseSqlServer(connection));

var app = builder.Build();

app.UseCors(builder =>
{
    builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
