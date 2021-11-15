const session = require('express-session');
const express = require('express');
const http = require('http');
var ws = require('ws');
var cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.options("*", cors({ origin: true, credentials: true }));

app.use(express.json())

const sessionParser = session({
  saveUninitialized: false,
  secret: 'LAZH3GiUz2WWNr',
  resave: false
});
app.use(sessionParser);

/*---------------ROUTERS---------------*/

const fileUpload = require('./routes/fileUpload');
app.use('/fileUpload', fileUpload);

/*-----------END OF ROUTERS------------*/

const httpServer = http.createServer(app);

const websocketServer = new ws.Server({ noServer: true });

httpServer.on('upgrade', (req, networkSocket, head) => {
  sessionParser(req, {}, () => {
    // Extra checks als die nodig zijn...
    // if (req.session.userName === undefined) {
    //   networkSocket.destroy(); 
    //   return;
    // }

    websocketServer.handleUpgrade(req, networkSocket, head, newWebSocket => {
      websocketServer.emit('connection', newWebSocket, req);
    });
  });
});

websocketServer.on('connection', (socket, req) => {
  socket.on('message', (message) => {
    req.session.reload((err)=>{
      if(err) { throw err };

      const parsedMessage = JSON.parse(message);

      // socket acties verwerken.
    
      req.session.save();
    });
  });
});

const port = process.env.PORT || 4000;
httpServer.listen(port, () => {
  mongoose.connect(`mongodb://localhost:27017/quizzy`,  {useNewUrlParser: true }, () => {
    console.log(`game server started on port ${port}`);
  });
});