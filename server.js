const { createServer } = require('http')
const next = require('next');
 
const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev })
const handle = app.getRequestHandler()
 
app.prepare().then(() => {
  const server = createServer(handle);
  server.on('error', (err) => {
    console.log('server error: ', err);
    throw err
  });
  server.listen(process.env.PORT || port, hostname, async () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`);
    setTimeout(async () => {
      await fetch(`http://${hostname}:${port}/api/warmer?${new URLSearchParams({
        hostname,
        port,
      })}`);
    }, 10000);
  });
});

