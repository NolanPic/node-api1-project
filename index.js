const express = require('express');
const DB = require('./data/db.js');

const server = express();

server.use(express.json());

// root request
server.get('/', (req, res) => {
    res.json('Welcome to Nodejs');
});

const url = '/api/users';

// create new user
server.post(url, (req, res) => {
    const user = req.body;
    if(!user.name || !user.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
    else {
        DB.insert(user).then(user => {
            res.status(201).json(user);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
        });
    }
});

// get all users
server.get(url, (req, res) => {
    DB.find().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The users information could not be retrieved." });
    });
});

// get user by id
server.get(`${url}/:id`, (req, res) => {

    const { id } = req.params;

    DB.findById(id).then(user => {
        if(!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
        res.status(200).json(user);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The user information could not be retrieved." });
    });
});

// delete user by id
server.delete(`${url}/:id`, (req, res) => {
    
    const { id } = req.params;

    DB.remove(id).then(removed => {
        if(removed) {
            res.status(200).json(removed);
        }
        else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

// put user by id
server.put(`${url}/:id`, (req, res) => {

    const { id } = req.params;

    const user = req.body;

    // request is invalid
    if(!user.name || !user.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
    else {
        DB.update(id, user).then(updated => {
            if(updated) {
                // user updated
                res.status(200).json(user);
            }
            else {
                // user does not exist
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        }).catch(err => {
            console.log(err);
            // server error
            res.status(500).json({ errorMessage: "The user information could not be modified." });
        });
    }
});

const port = 5000;

server.listen(port, () => console.log(`\nServer listening on port ${port}\n`));