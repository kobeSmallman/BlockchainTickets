# BlockchainTickets
A blockchain solution for event tickets.

# Connecting to the BlockchainTickets PostgreSQL Database

## Prerequisites
- pgAdmin 4 installed on your machine.
- Your IP address must be whitelisted in the AWS Security Group so let me know what oyur ip is from typing whatismyipaddress in a web browser clicking on first link and telling me that value. (if you are coding from multiople locations, I may need to add the other locations as well to whitelist you). Set up remote desktop at your home computer if this is going to be an ongoing issue with coding from a bunch of different locations otherwise we alllll gooooddd.

## Steps to Connect
1. Open pgAdmin 4.
2. Right-click on 'Servers' and select 'Create' > 'Server'.
3. In the 'Create - Server' dialog:
   - General Tab:
     - Name: Enter a name for the connection (e.g., 'BlockchainTickets DB').
   - Connection Tab:
     - Host name/address: text me for this. 
     - Port: `5432`
     - Maintenance database: `postgres`
     - Username: `YourUsername` (text me when you get to this part)
     - Password: `YourPassword` (Do not share this in the guide) (text me when you get to this part)
     - Click "Save Password?" if you do not want to enter it each time.
4. Click 'Save' to register the server.
5. You should now see the server in the left sidebar. Click on it to connect.

## Troubleshooting
If you encounter issues:
- Verify your network connection.
- Ensure your IP is still whitelisted.
- Double-check the credentials and endpoint.

## Support
If you need further assistance, please contact me Kobe Smallman @ 587-370-1108.

Dependency Injection (Startup.cs and Program.cs)
This is recommended because it helps manage dependencies cleanly and efficiently across your application. It allows your app to be more modular and easier to test because it's not tightly coupled to specific implementations of services or components. In ASP.NET Core, dependency injection is set up in the Startup.cs and Program.cs files and is a key feature for developing scalable applications.

Repository Pattern (Repositories folder)
This pattern is beneficial if you expect your application to grow or anticipate changes in the database/storage implementations. By abstracting data access behind a consistent set of interfaces (repositories), you can change underlying database details with minimal impact on your business logic or API endpoints.

Data Transfer Objects (DTOs folder)
Using DTOs is recommended when you need to shape the data for the needs of your consumers without exposing internal models. For a web application that could potentially scale and involve various data consumers (like web and mobile apps), DTOs provide a way to send only necessary data in a format that's most useful to the client, enhancing both security and performance.


BlockchainTickets/
│
├── BlockchainTicketsAPI/              # Root directory for the API
│   ├── bin/
│   ├── obj/
│   ├── Controllers/                   # Controllers handle incoming HTTP requests
│   ├── Properties/
│   ├── Models/                        # Domain models represent the entities in your application
│   ├── Dtos/                          # Data Transfer Objects for external data shape
│   ├── Repositories/                  # Repository interfaces and implementations
│   ├── Services/                      # Business logic and service layer
│   ├── Configurations/                # Configurations like DB contexts and other settings
│   ├── Migrations/                    # Database migrations if using EF Core
│   ├── wwwroot/                       # Static files directory
│   ├── appsettings.json               # Configuration settings
│   ├── appsettings.Development.json   # Development specific settings
│   ├── appsettings.Production.json    # Production specific settings
│   ├── Program.cs                     # Entry point of the API
│   ├── Startup.cs                     # App startup configuration, including DI setup
│   └── BlockchainTicketsAPI.csproj    # Project file
│
├── BlockchainTickets.Tests/           # Unit tests and integration tests for the API
│   ├── ControllerTests/
│   ├── ServiceTests/
│   ├── RepositoryTests/
│   └── BlockchainTickets.Tests.csproj
│
└── README.md                          # Project overview and setup instructions
