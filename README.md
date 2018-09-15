# Raspberry Pi Web Server
A simple web based file server designed for use on a Raspberry Pi. Recommended for use behind a firewall.

## Configuration
Set `serverName` and `fileSystemDirectory` in `config.json`, and thats it! You're ready to connect via your web browser to the Pi's ip on the specified port (default 8080).

## Running the Application
1. Run `npm install`
2. Run `node app.js`