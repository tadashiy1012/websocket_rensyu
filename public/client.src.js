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