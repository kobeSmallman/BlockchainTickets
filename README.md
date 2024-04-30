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

