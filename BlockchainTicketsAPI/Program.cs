using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using BlockchainTicketsAPI.Data;
using BlockchainTicketsAPI.Models;
using BlockchainTicketsAPI.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;

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
builder.Services.AddSingleton<AuthenticationService>();

// Add configuration for Firebase
builder.Configuration.AddJsonFile("firebaseConfig.json", optional: false, reloadOnChange: true);

// Load the Firebase configuration
var firebaseConfig = builder.Configuration.GetSection("Firebase").Get<FirebaseConfig>();

// Get the relative path to the service account key
var credentialPath = Path.Combine(Directory.GetCurrentDirectory(), firebaseConfig.CredentialPath);

// Initialize Firebase
FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.FromFile(credentialPath),
    ProjectId = firebaseConfig.ProjectId
});

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

app.Run();

// FirebaseConfig class to map the JSON configuration
public class FirebaseConfig
{
    public string ProjectId { get; set; }
    public string CredentialPath { get; set; }
}
