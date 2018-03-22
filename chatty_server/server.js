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
  //defines total user object
  let totalUsers =  {connected: 0};

  //random color generator
  const randomColor = function() {
     let hex = '0123456789ABCDEF'
     let color = '#'
     for(let i = 0; i < 6; i++) {
      color += hex.charAt(Math.floor(Math.random() * 16));
     }
     return color;
   }


wss.on('connection', (ws) => {
  //sets user color
  let userColor = randomColor();
  //sets uername
  ws.username = 'Anonymous';
  wss.broadcast = function broadcast(messageJSON) {
   wss.clients.forEach(function each(client) {
     if (client.readyState === WebSocket.OPEN) {
       client.send(JSON.stringify(messageJSON));
       }
   });
 };

  console.log('Client connected');
  //adds one to the totalUser object
  totalUsers.connected++;


  ws.on('message', function incoming(message) {
    let messageAsJSON = JSON.parse(message);
    messageAsJSON.id = uuidv4();
    messageAsJSON.color = userColor;

    //checks message types
    if(messageAsJSON.type === 'postMessage') {
         messageAsJSON.type = 'incomingMessage'
     } else if (messageAsJSON.type === 'postNotification') {
         messageAsJSON.type = 'incomingNotification';
         messageAsJSON.username = null;
     }
    wss.broadcast = function broadcast(messageAsJSON) {

        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(messageAsJSON));
          }
        });
      };
      wss.broadcast(messageAsJSON);

  });

  //sets default values for server, sets message for default connection
  let usersOnline = {type: 'incomingUserCount', content:`Anonymous user connected! ${totalUsers.connected} user(s) online.`, id: uuidv4(), usersOnline: totalUsers.connected}
  wss.broadcast(usersOnline);

  ws.on('close', () => {
    //reduces totalUser dount
    totalUsers.connected--;
    console.log('Client disconnected')
    //sets default values for server, sets message for default connection
    let usersOnline = {type: 'incomingUserCount', content:`User ${ws.username} disconnected. ${totalUsers.connected} user(s) online.`, id: uuidv4(), usersOnline: totalUsers.connected}
    wss.broadcast(usersOnline);

  });
});
