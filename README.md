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

# BlockchainTickets - Project Overview

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

## Current Status

### User Login and Registration
- **User Registration**: Users can register on the platform by providing their email, password, and other necessary details.
- **User Login**: Registered users can log in using their email and password.
- **Authentication**: User authentication is handled securely, ensuring that user data is protected.

### Plan for Testing
- **Unit Tests**: We have implemented unit tests for the smart contract functions to ensure they work as expected.
- **Integration Tests**: Integration tests are in place to test the entire flow from user registration to ticket purchase.
- **User Testing**: We will invite a group of users to test the application on the testnet and provide feedback.
- **Security Audits**: We plan to conduct security audits of our smart contract code to identify and fix any vulnerabilities.
- **Bug Bounty Program**: A bug bounty program will be launched to encourage the community to find and report bugs.

## Next Steps

### Software Wallet Integration
The next step in our project is to integrate a software wallet, such as MetaMask, to allow users to purchase tickets using cryptocurrency. This will involve:

1. **Frontend Integration with MetaMask**:
   - Prompt users to connect their MetaMask wallet to the application.
   - Use `web3.js` or `ethers.js` to interact with the Ethereum blockchain.

2. **Smart Contract Development**:
   - Develop and deploy a smart contract to handle ticket sales and enforce resale limitations.

3. **Backend Integration**:
   - Ensure the backend can interact with the deployed smart contract and handle transactions.

4. **Testing**:
   - Deploy the smart contract to an Ethereum testnet (e.g., Ropsten or Rinkeby).
   - Test the entire flow from ticket purchase to resale using test accounts.
   - Conduct security audits and user testing to ensure the system is secure and functional.

### Testing Plan
- **Ethereum Testnet**: We will deploy our smart contract to a popular Ethereum testnet like Ropsten or Rinkeby to simulate real-life scenarios.
- **Unit Tests**: Write comprehensive unit tests for all smart contract functions.
- **Integration Tests**: Test the integration of the frontend, backend, and smart contract.
- **User Testing**: Invite users to test the application on the testnet and provide feedback.
- **Security Audits**: Conduct regular security audits to identify and fix vulnerabilities.
- **Bug Bounty Program**: Launch a bug bounty program to encourage the community to find and report bugs.

## How to Contribute
We welcome contributions from the community. Please fork the repository and submit pull requests for any improvements or bug fixes.

## License
This project is licensed under the MIT License.
