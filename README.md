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
FRONTEND FILE STRUCTURE 2024-04-30
blockchain-tickets-ui/
│
├── public/                      # Contains static assets and the HTML file
│   ├── favicon.ico              # Favicon icon
│   ├── index.html               # Main HTML file
│   ├── logo192.png              # Logo image
│   ├── logo512.png              # Larger logo image
│   ├── manifest.json            # Application manifest file
│   └── robots.txt               # Instructions for web crawlers
│
├── src/                         # Source files for the application
│   ├── assets/                  # Static assets like images, fonts, etc.
│   │   └── main.css             # Main stylesheet for the application
│   │
│   ├── components/              # Reusable UI components
│   │   ├── Footer/              # Footer component
│   │   │   ├── index.js         # Footer component logic
│   │   │   └── styles.css       # Footer component styles
│   │   │
│   │   ├── Header/              # Header component
│   │   │   ├── index.js         # Header component logic
│   │   │   └── styles.css       # Header component styles
│   │   │
│   │   └── Layout/              # Layout wrapper component
│   │       ├── index.js         # Layout component logic
│   │       └── styles.css       # Layout component styles
│   │
│   ├── pages/                   # Page components
│   │   ├── Event/               # Event page
│   │   │   ├── index.js         # Event page logic
│   │   │   └── styles.css       # Event page styles
│   │   ├── Home/                # Home page
│   │   │   ├── index.js         # Home page logic
│   │   │   └── styles.css       # Home page styles
│   │   ├── Login/               # Login page
│   │   │
│ │ │ ├── index.js # Login page logic
│ │ │ └── styles.css # Login page styles
│ │ │
│ ├── services/ # Services to handle backend API calls
│ │ ├── authService.js # Authentication service
│ │ └── blockchainService.js # Blockchain interaction service
│ │
│ ├── App.js # Root React component
│ ├── App.css # Styles for the App component
│ ├── index.js # Entry point for React to hook into the DOM
│ ├── index.css # Global styles
│ ├── reportWebVitals.js # Tool for measuring performance
│ ├── setupTests.js # Setup file for Jest tests
│ └── logo.svg # Logo used in the header
│
├── README.md # Project documentation
├── package.json # NPM package manager file
└── package-lock.json # NPM locked down dependency versions
BACKEND FILE STRUCTURE 2024-04-30
BlockchainTicketsAPI/
│
├── Configurations/             # Configuration files for different parts of the application
│
├── Controllers/                # Controllers to handle API requests
│   ├── EventsController.cs     # Controller for event-related operations
│   ├── TicketsController.cs    # Controller for ticket-related operations
│   └── UsersController.cs      # Controller for user-related operations
│
├── Data/                       # Data access layer
│   ├── ApplicationDbContext.cs # Entity Framework Core context
│
├── Dtos/                       # Data Transfer Objects for encapsulating data
│   ├── EventDto.cs             # DTO for Event data
│   ├── TicketDto.cs            # DTO for Ticket data
│   └── UserDto.cs              # DTO for User data
│
├── Models/                     # Domain models representing database tables
│   ├── Event.cs                # Event model
│   ├── Ticket.cs               # Ticket model
│   └── User.cs                 # User model
│
├── Repositories/               # Repositories for handling database operations
│   ├── EventRepository.cs      # Repository for Event data
│   ├── TicketRepository.cs     # Repository for Ticket data
│   └── UserRepository.cs       # Repository for User data
│
├── Services/                   # Services for business logic
│   ├── AuthenticationService.cs # Service for authentication-related logic
│   └── BlockchainService.cs    # Service for blockchain interaction logic
│
├── wwwroot/                    # Static files for the API
│
├── appsettings.Development.json # Configuration settings for development environment
├── appsettings.Production.json  # Configuration settings for production environment
├── appsettings.json             # General configuration settings
├── BlockchainTicketsAPI.csproj  # Project file
├── Program.cs                   # Entry point of the API
├── Startup.cs                   # Configures services and the app's request pipeline
└── README.md                    # Project documentation
