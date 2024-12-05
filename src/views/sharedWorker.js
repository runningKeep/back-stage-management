const ports = new Map()
onconnect = (e) => {
  const port = e.ports[0];
  console.log(e.ports,'e.ports');
  if(!ports.get(port)){
    ports.set(port,1)
  }
  console.log(ports);
  port.onmessage = (e) => {
    const workerResult = `Result: ${(e.data.data[0]||1) *( e.data.data[1]||1)}`;
    ports.forEach(p=>p.postMessage(workerResult))
  };
};
