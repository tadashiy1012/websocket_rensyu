const express = require('express');
const serveStatic = require('serve-static')
const expressWs = require('express-ws');

const wsApp = expressWs(express());
const app = wsApp.app;

app.use(serveStatic(__dirname + '/public'));

app.get('/', (req, res, next) => {
  res.end();
  next();
});

let msgs = [];

app.ws('/', (ws, req) => {
  console.log('connect');
  ws.on('message', (msg) => {
    console.log('recive msg:' + msg);
    const id = ws._ultron.id;
    const dt = new Date(Date.now());
    msgs.unshift('[' + id + ']' + dt + ' > ' + msg);
    if (msgs.length > 10) {
      msgs.splice(10);
    }
  });
});
const indexWss = wsApp.getWss('/');

setInterval(() => {
  console.log('>>>broadcast msgs');
  const data = JSON.stringify(msgs);
  indexWss.clients.forEach((client) => {
    client.send(data);
  });
}, 5000);

app.listen(3000, () => {
  console.log('start server on 3000');
});