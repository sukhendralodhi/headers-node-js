// Headers in Node.js are a fundamental part of HTTP communication. They provide essential information about the request or response, such as content type, content length, and other metadata. In Node.js, you can access and manipulate headers using the `http` module or frameworks like Express.

// set headers in express:
app.get('/', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send('Hello, World!');
});

// get headers in express:
app.get('/headers', (req, res) => {
    const headers = req.headers;
    res.json(headers);
});

// set headers in http module:
const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!');
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// get headers in http module:
const server = http.createServer((req, res) => {
    const headers = req.headers;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(headers));
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// always add x to the header: if you want to add a custom header to all responses, you can use middleware in Express:
app.use((req, res, next) => {
    res.setHeader('X-Custom-Header', 'MyCustomValue');
    next();
});