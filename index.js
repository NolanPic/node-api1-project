const express = require('express');
const DB = require('./data/db.js');

const server = express();

// root request
server.get('/', (req, res) => {
    res.json('Welcome to Nodejs');
});

const url = '/api/users';

server.get(url, (req, res) => {
    DB.find().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ err });
    });
});

const port = 5000;

server.listen(port, () => console.log(`\nServer listening on port ${port}\n`));