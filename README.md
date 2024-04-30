# BlockchainTickets
A blockchain solution for event tickets.

if interested see bottom of page to see the goal of the project.

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


Project Overview: BlockchainTickets

Goal:
BlockchainTickets is designed to disrupt the traditional event ticketing market, currently dominated by platforms like Ticketmaster. This project aims to leverage blockchain technology to introduce a high level of transparency, security, and efficiency in the ticketing process, which is often plagued by issues like fraud and scalping. By using blockchain, BlockchainTickets ensures that each ticket is unique and securely owned, making unauthorized reselling and duplication nearly impossible. This not only enhances trust among participants but also streamlines the process of buying, selling, and checking tickets.

Problem Being Solved:
Traditional ticketing systems are often criticized for their lack of transparency and high susceptibility to fraud. Customers and event organizers face challenges like fake tickets, high secondary market prices due to scalping, and a lack of control over ticket distribution after the initial sale. These problems undermine the customer experience and profitability for event organizers.

Solution Offered by BlockchainTickets:
BlockchainTickets addresses these issues by integrating blockchain technology into the ticketing process. Here’s how the solution improves the system:

Security and Authenticity: Each ticket is a blockchain-based digital asset, which means it's tamper-proof and its authenticity can be verified. Blockchain's inherent security features prevent duplication and unauthorized ticket transfers.
Transparency in Ticket Lifecycle: Every transaction on the blockchain is recorded on a public ledger, which is accessible to everyone but cannot be altered without consensus. This ensures transparency in ticket sales and ownership.
Decentralized Control: Blockchain allows for decentralized control over ticketing, reducing dependence on central authorities that can be a single point of failure or corruption. It empowers event organizers and consumers by giving them control over their purchases and sales.
Reduced Scalping and Fraud: By utilizing smart contracts, BlockchainTickets can enforce rules about ticket reselling, including price caps or transfer restrictions, directly within the ticket itself, which helps mitigate issues like scalping and fraud.
Key Features:

Secure ticket sales and transfers via blockchain: Ensures that all ticket transactions are secure and verifiable.
Real-time availability and booking of tickets: Enhances user experience by providing up-to-date ticket availability and seamless booking options.
Detailed seating arrangements and venue selection: Allows users to view interactive seating charts and choose precisely where they want to sit.
User profiles for sellers and buyers: Creates a personalized experience for users, whether they are event organizers or attendees, enabling better service and offers based on user history.
Mobile and web access: Ensures accessibility across different devices, increasing the reach and ease of use for the platform.
Integration with payment gateways: Facilitates secure and varied payment options, catering to a global audience.
Technology Stack:

Frontend: Uses React (alternatively Angular or Vue) to create a dynamic and responsive user interface that can handle real-time data updates and user interactions efficiently.
Backend: Employs .NET Core for building a robust and scalable API that can handle the demands of handling secure transactions and user data management.
Database: Utilizes PostgreSQL to reliably store and manage user data and complex ticketing transactions, chosen for its robustness and scalability.
Blockchain: Adopts Ethereum for its mature ecosystem and smart contract capabilities, allowing for detailed and enforceable ownership rules embedded within the tickets.
This architecture and solution design aim to create a seamless, secure, and user-friendly platform that addresses the inefficiencies of traditional ticketing systems while harnessing the advantages of modern technology.