# BlockchainTickets
A blockchain solution for event tickets.

## Goal
BlockchainTickets aims to become a blockchain-based event ticketing platform that rivals traditional services like Ticketmaster. It leverages blockchain technology to enhance transparency, security, and efficiency in the ticketing process. This helps in minimizing fraud, unauthorized reselling, and providing a trustworthy experience for both event organizers and attendees.

## Problem Being Solved
Traditional ticketing systems often suffer from issues like fraud, high scalping, and a lack of control over the distribution of tickets after the initial sale. BlockchainTickets addresses these problems by embedding the ticketing process in a blockchain, ensuring each ticket is unique and securely owned.

## Solution
The platform utilizes blockchain to provide:
- **Security and Authenticity:** Tickets are tamper-proof and their authenticity can be verified.
- **Transparency:** Every transaction is recorded on a public ledger, visible to everyone but cannot be altered retroactively.
- **Decentralized Control:** Reduces reliance on central authorities, mitigating risks associated with them.
- **Reduced Scalping and Fraud:** Enforces rules about ticket reselling directly within the ticket using smart contracts.

## Key Features
- Secure ticket sales and transfers via blockchain.
- Real-time availability and booking.
- Detailed seating arrangements and venue selection.
- User profiles for sellers and buyers.
- Mobile and web access for ease of use.
- Integration with payment gateways for secure transactions.

## Technology Stack
- **Frontend:** React for a dynamic and responsive user interface.
- **Backend:** .NET Core for a scalable API.
- **Database:** PostgreSQL for robust data management.
- **Blockchain:** Ethereum for managing the ticket lifecycle and ensuring security.

## File Structure

### Frontend (`blockchain-tickets-ui`)
blockchain-tickets-ui/
├── public/
│ ├── favicon.ico
│ ├── index.html
│ ├── logo192.png
│ ├── logo512.png
│ ├── manifest.json
│ └── robots.txt
├── src/
│ ├── assets/
│ │ └── main.css
│ ├── components/
│ │ ├── Footer/
│ │ │ ├── index.js
│ │ │ └── styles.css
│ │ ├── Header/
│ │ │ ├── index.js
│ │ │ └── styles.css
│ │ └── Layout/
│ │ ├── index.js
│ │ └── styles.css
│ ├── pages/
│ │ ├── Event/
│ │ │ ├── index.js
│ │ │ └── styles.css
│ │ ├── Home/
│ │ │ ├── index.js
│ │ │ └── styles.css
│ │ └── Login/
│ │ ├── index.js
│ │ └── styles.css
│ ├── services/
│ │ ├── authService.js
│ │ └── blockchainService.js
│ ├── App.js
│ ├── App.css
│ ├── index.js
│ ├── index.css
│ ├── reportWebVitals.js
│ ├── setupTests.js
│ └── logo.svg
├── README.md
├── package.json
└── package-lock.json

### Backend (`BlockchainTicketsAPI`)
BlockchainTicketsAPI/
├── Configurations/
├── Controllers/
│ ├── EventsController.cs
│ ├── TicketsController.cs
│ └── UsersController.cs
├── Data/
│ ├── ApplicationDbContext.cs
├── Dtos/
│ ├── EventDto.cs
│ ├── TicketDto.cs
│ └── UserDto.cs
├── Models/
│ ├── Event.cs
│ ├── Ticket.cs
│ └── User.cs
├── Repositories/
├── Services/
│ ├── AuthenticationService.cs
│ └── BlockchainService.cs
├── wwwroot/
├── appsettings.Development.json
├── appsettings.Production.json
├── appsettings.json
├── BlockchainTicketsAPI.csproj
├── Program.cs
├── Startup.cs
└── README.md


## Connecting to the BlockchainTickets PostgreSQL Database

### Prerequisites
- pgAdmin 4 installed on your machine.
- Your IP address must be whitelisted in the AWS Security Group. To find your IP address, type `whatismyipaddress` in a web browser, click on the first link, and provide the value displayed. (If you are coding from multiple locations, I may need to add the other locations to the whitelist as well. Set up remote desktop at your home computer if this is going to be an ongoing issue with coding from various locations.)

### Steps to Connect
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

### Troubleshooting
If you encounter issues:
- Verify your network connection.
- Ensure your IP is still whitelisted.
- Double-check the credentials and endpoint.

### Support
If you need further assistance, please contact Kobe Smallman @ 587-370-1108.

## Use Case of Different Regions
### Overview
Deploying databases in different regions allows you to improve performance for users in various locations, enhance redundancy, and ensure availability. Each AWS region can have its own database instance, and you can connect to the appropriate instance based on your requirements.

### Benefits
- **Reduced Latency:** By placing your database closer to users, you can reduce the time it takes for data to travel, resulting in faster response times.
- **Disaster Recovery:** Having databases in multiple regions ensures that if one region goes down, you can switch to a database in another region with minimal downtime.
- **Geographic Data Distribution:** Helps in complying with data sovereignty laws by storing data in specific regions.

### Example
For now, we are using the Canada Central (ca-central-1) region:
Endpoint: blockchainticket.chugii0cqkye.ca-central-1.rds.amazonaws.com

In the future, if we decide to expand, we could have endpoints in other regions like US West (Oregon) or EU (Frankfurt) for better global coverage.

### Configuration
Ensure your `appsettings.json` points to the correct endpoint for the region you are using:
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "BlockchainDb": "Host=blockchainticket.chugii0cqkye.ca-central-1.rds.amazonaws.com;Port=5432;Database=postgres;Username=postgres;Password=Contact me or you should already know.;"
  }
}
## Database Tables and Relationships

### Users Table
- **Fields:** UserId, Username, Email, PasswordHash, Role, CreatedAt, UpdatedAt
- **Relationships:** 
  - One-to-Many with Tickets
  - One-to-Many with Feedbacks
  - One-to-Many with Wallets
  - One-to-Many with Notifications
  - One-to-Many with UserRoles
  - One-to-Many with Transactions (as Buyer and Seller)

### Venues Table
- **Fields:** VenueId, VenueName, Location, Capacity, CreatedAt, UpdatedAt
- **Relationships:** 
  - One-to-Many with Events

### Events Table
- **Fields:** EventId, EventName, Description, VenueId, EventDate, CreatedAt, UpdatedAt
- **Relationships:** 
  - One-to-Many with Tickets
  - One-to-Many with Feedbacks
  - One-to-Many with EventCategoryMappings
  - Many-to-One with Venues

### Tickets Table
- **Fields:** TicketId, EventId, OwnerId, Price, IsResold, IsResellable, CreatedAt, UpdatedAt
- **Relationships:** 
  - Many-to-One with Users
  - Many-to-One with Events
  - One-to-Many with Transactions
  - One-to-Many with TicketLogs

### Roles Table
- **Fields:** RoleId, RoleName, CreatedAt, UpdatedAt
- **Relationships:** 
  - One-to-Many with UserRoles
  - One-to-Many with RolePermissions

### Permissions Table
- **Fields:** PermissionId, PermissionName, CreatedAt, UpdatedAt
- **Relationships:** 
  - One-to-Many with RolePermissions

### UserRoles Table
- **Fields:** UserRoleId, UserId, RoleId, CreatedAt, UpdatedAt
- **Relationships:** 
  - Many-to-One with Users
  - Many-to-One with Roles

### RolePermissions Table
- **Fields:** RolePermissionId, RoleId, PermissionId, CreatedAt, UpdatedAt
- **Relationships:** 
  - Many-to-One with Roles
  - Many-to-One with Permissions

### Feedbacks Table
- **Fields:** FeedbackId, EventId, UserId, Rating, Comment, CreatedAt, UpdatedAt
- **Relationships:** 
  - Many-to-One with Events
  - Many-to-One with Users

### Wallets Table
- **Fields:** WalletId, UserId, WalletAddress, CreatedAt, UpdatedAt
- **Relationships:** 
  - Many-to-One with Users

### Notifications Table
- **Fields:** NotificationId, UserId, Message, IsRead, CreatedAt, UpdatedAt
- **Relationships:** 
  - Many-to-One with Users

### Transactions Table
- **Fields:** TransactionId, TicketId, BuyerId, SellerId, TransactionDate, TransactionAmount, CreatedAt, UpdatedAt
- **Relationships:** 
  - Many-to-One with Tickets
  - Many-to-One with Users (Buyer and Seller)

### TicketLogs Table
- **Fields:** TicketLogId, TicketId, Action, PerformedBy, ActionDate, CreatedAt, UpdatedAt
- **Relationships:** 
  - Many-to-One with Tickets
  - Many-to-One with Users

### EventCategories Table
- **Fields:** EventCategoryId, CategoryName, CreatedAt, UpdatedAt
- **Relationships:** 
  - One-to-Many with EventCategoryMappings

### EventCategoryMappings Table
- **Fields:** EventCategoryMappingId, EventId, EventCategoryId, CreatedAt, UpdatedAt
- **Relationships:** 
  - Many-to-One with Events
  - Many-to-One with EventCategories


  TEST PLAN: 

  Backend Testing Plan
Unit Testing

Objective: Verify that individual components of the backend, such as methods and classes, perform as expected.
Tools: xUnit or NUnit.
Scope: Focus on testing the business logic, data access logic, and services.
Approach:
Write tests for each method and class.
Use mock objects to simulate dependencies and isolate the component under test.
Ensure each test case covers both positive and negative scenarios.
Integration Testing

Objective: Ensure that different components of the backend work together as expected.
Tools: xUnit or NUnit.
Scope: Test the integration of controllers, services, and repositories.
Approach:
Test the interaction between controllers and services.
Validate that data flows correctly from the controllers through the services to the repositories.
Use a test database to verify that the data access logic performs correctly.
API Testing

Objective: Validate the API endpoints to ensure they handle requests and responses correctly.
Tools: Postman or similar API testing tools.
Scope: Test all API endpoints for correct functionality, including authentication, CRUD operations, and error handling.
Approach:
Create test cases for each API endpoint.
Validate the request and response structure, including headers, status codes, and payload.
Perform security testing to ensure endpoints are secure against common vulnerabilities (e.g., SQL injection, XSS).
Performance Testing

Objective: Ensure the backend can handle expected loads and perform well under stress.
Tools: Apache JMeter or similar performance testing tools.
Scope: Test the performance of critical API endpoints under varying loads.
Approach:
Simulate different levels of user load and measure response times.
Identify and address performance bottlenecks.
Ensure the backend can scale to meet demand.
Frontend Testing Plan
Unit Testing

Objective: Verify that individual components of the frontend perform as expected.
Tools: Jest and React Testing Library.
Scope: Focus on testing React components, utility functions, and hooks.
Approach:
Write tests for each React component to ensure they render correctly and handle user interactions.
Test utility functions and hooks in isolation.
Use mock data and functions to simulate component dependencies.
Integration Testing

Objective: Ensure that different components of the frontend work together as expected.
Tools: Jest and React Testing Library.
Scope: Test the integration of multiple components within a single page or feature.
Approach:
Validate the interactions between parent and child components.
Ensure that state and props are passed correctly between components.
Test complex user interactions that span multiple components.
End-to-End Testing

Objective: Validate the entire user journey from the frontend to the backend.
Tools: Cypress or Selenium.
Scope: Test complete user scenarios, such as registration, login, and ticket purchase.
Approach:
Create test cases that mimic real user interactions with the application.
Validate that data is correctly processed and displayed from the frontend to the backend.
Ensure that user flows are intuitive and error-free.
Performance Testing

Objective: Ensure the frontend performs well under different conditions.
Tools: Lighthouse or similar performance testing tools.
Scope: Test the performance of key pages and user interactions.
Approach:
Measure load times and responsiveness of the application.
Identify and optimize performance bottlenecks.
Ensure the application is optimized for different devices and screen sizes.
Continuous Integration and Continuous Deployment (CI/CD)
Objective: Automate the testing process to ensure consistent quality and facilitate rapid deployment.
Tools: GitHub Actions, Jenkins, or similar CI/CD tools.
Approach:
Set up automated pipelines to run tests on every code commit.
Ensure that tests cover both the frontend and backend components.
Deploy the application to a staging environment for further testing before production.