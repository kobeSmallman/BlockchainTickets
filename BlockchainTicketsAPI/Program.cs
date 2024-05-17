using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using BlockchainTicketsAPI.Data;
using BlockchainTicketsAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

var builder = WebApplication.CreateBuilder(args);

// Configure logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.SetMinimumLevel(LogLevel.Debug);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("BlockchainDb"))
           .EnableSensitiveDataLogging() // Enable sensitive data logging
           .LogTo(Console.WriteLine, LogLevel.Information)); // Log to console

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Test endpoint to fetch all data from TestTable
app.MapGet("/testdb", async (ApplicationDbContext dbContext) =>
{
    try
    {
        Console.WriteLine("Executing /testdb endpoint...");
        var data = await dbContext.TestTable.ToListAsync();
        Console.WriteLine($"Fetched {data.Count} rows.");
        if (data.Count == 0)
        {
            return Results.NotFound(new { message = "No data found in the TestTable." });
        }
        return Results.Ok(data);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error during database access: {ex.Message}");
        return Results.Problem($"Error during database access: {ex.Message}");
    }
});

// Simple DB test endpoint to count rows in TestTable
app.MapGet("/simpledbtest", async (ApplicationDbContext context) =>
{
    try
    {
        Console.WriteLine("Executing /simpledbtest endpoint...");
        var count = await context.TestTable.CountAsync();
        Console.WriteLine($"Total rows in testtable: {count}");
        return Results.Ok($"Total rows in testtable: {count}");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error during database access: {ex.Message}");
        return Results.Problem($"Error during database access: {ex.Message}");
    }
});

// Raw SQL test endpoint to fetch all data from TestTable
app.MapGet("/testdbraw", async (ApplicationDbContext context) =>
{
    try
    {
        var conn = context.Database.GetDbConnection();
        await conn.OpenAsync();
        var command = conn.CreateCommand();
        command.CommandText = "SELECT \"Id\", \"SampleField\" FROM public.testtable";
        var results = new List<TestModel>();

        using (var reader = await command.ExecuteReaderAsync())
        {
            while (await reader.ReadAsync())
            {
                results.Add(new TestModel
                {
                    Id = reader.GetInt32(0),
                    SampleField = reader.GetString(1)
                });
            }
        }

        await conn.CloseAsync();
        return Results.Ok(results.Any() ? results : new { Message = "No data found in the TestTable." });
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error during database access: {ex.Message}");
        return Results.Problem($"Error during database access: {ex.Message}");
    }
});
app.MapGet("/checkdb", async (ApplicationDbContext context) =>
{
    var conn = context.Database.GetDbConnection();
    await conn.OpenAsync();
    var command = conn.CreateCommand();
    command.CommandText = "SELECT current_database(), current_schema()";

    using (var reader = await command.ExecuteReaderAsync())
    {
        while (await reader.ReadAsync())
        {
            var dbName = reader.GetString(0);
            var schemaName = reader.GetString(1);
            return Results.Ok(new { Database = dbName, Schema = schemaName });
        }
    }

    await conn.CloseAsync();
    return Results.Problem("Could not retrieve database and schema information.");
});


app.Run();
