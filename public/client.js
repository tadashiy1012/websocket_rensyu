(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.addEventListener('load', () => {
  const says = ['hoge', 'fuga', 'moge', 'piyo'];
  const out = document.getElementById('out');
  function appendMsg(str) {
    while(out.firstChild) {
      out.removeChild(out.firstChild);
    }
    const obj = JSON.parse(str);
    for (let msg of obj) {
      const p = document.createElement('p');
      p.appendChild(document.createTextNode(msg));
      out.appendChild(p);
    }
  }
  const host = location.origin.replace(/^http/, 'ws');
  const ws = new WebSocket(host);
  ws.onopen = () => console.log('open');
  ws.onclose = () => console.log('close');
  ws.onmessage = (msg) => {
    appendMsg(msg.data);
  };
  window.setTimeout(() => {
    window.setInterval(() => {
      ws.send(says[Math.floor(Math.random() * says.length)]);
    }, 1000);
  }, 3000);
});
},{}]},{},[1])
//# sourceMappingURL=client.js.map
