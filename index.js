const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.json('Welcome to Nodejs');
});

const port = 5000;

server.listen(port, () => console.log(`\nServer listening on port ${port}\n`));