const ws = require("ws");

const websocketServer = new ws.Server({ noServer: true });

const sendWebsocketGetOrders = () => {
  websocketServer.clients.forEach(client => {
    client.send(JSON.stringify({action:"getOrders"}));
  });
}

const sendWebsocketGetReceived = () => {
  websocketServer.clients.forEach(client => {
    client.send(JSON.stringify({action:"getReceived"}));
  });
}

websocketServer.on("connection", (socket, req) => {
  socket.on("message", (message) => {

      const parsedMessage = JSON.parse(message);

      switch (parsedMessage.action) {
        case "getOrders":
          sendWebsocketGetOrders();
          break;

        case "getReceived":
          sendWebsocketGetReceived();
          break;

        default:
          break;
      }
  });
});

module.exports = {websocketServer, sendWebsocketGetOrders, sendWebsocketGetReceived};