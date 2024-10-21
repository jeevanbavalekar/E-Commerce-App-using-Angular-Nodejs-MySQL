require('dotenv').config();
const http = require('http');
const app = require('./app');

const PORT = 1010;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
