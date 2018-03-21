// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

const server = express()

  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    let messageAsJSON = JSON.parse(message);

    console.log('User', messageAsJSON.username, 'said', messageAsJSON.content);
    messageAsJSON.id = uuidv4();

    wss.broadcast = function broadcast(messageAsJSON) {
      
        console.log('broadcasting', messageAsJSON)
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(messageAsJSON));
          }
        });
      };
      wss.broadcast(messageAsJSON);

  });

  ws.on('close', () => console.log('Client disconnected'));
});
