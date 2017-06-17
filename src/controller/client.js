import mongoose from 'mongoose';
import { Router } from 'express';
import Client from '../model/client';
import Project from '../model/project';
import Stakeholder from '../model/stakeholder';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
    let api = Router();

    // CRUD - Create Read Update Delete

    // '/v1/client/add' - Create
    api.post('/add', authenticate, (req, res) => {
        let newClient = new Client();
        newClient.name = req.body.name;
        newClient.logo = req.body.logo;
        newClient.description = req.body.description;
        newClient.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({ message: "Client saved successfully" });
        });
    });

    // '/v1/client/' - Read
    //Get all clients
    api.get('/', (req, res) => {
        Client.find({}, (err, clients) => {
            if (err) {
                res.send(err);
            }
            res.json(clients);
        });
    });

    // '/v1/client/:id' - Read
    //Get one client
    api.get('/:id', (req, res) => {
        Client.findById(req.params.id, (err, client) => {
            if (err) {
                res.send(err);
            }
            res.json(client);
        });
    });

    // '/v1/client/:id' - Update
    api.put('/:id', authenticate, (req, res) => {
        Client.findById(req.params.id, (err, client) => {
            if (err) {
                res.send(err);
            }
            client.name = req.body.name;
            client.logo = req.body.logo;
            client.description = req.body.description;
            client.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "Client updated successfully" });
            });
        });
    });

    // '/v1/client/:id' - Delete
    api.delete('/:id', authenticate, (req, res) => {
        Client.findById(req.params.id, (err, client) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            if (client === null) {
                res.status(404).send("Client not found");
                return;
            }
            Client.remove({
                _id: req.params.id
            }, (err, client) => {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                Project.remove({
                    client: req.params.id
                }, (err, project) => {
                    if (err) {
                        res.send(err);
                    }
                    res.json({ message: "Client successfully removed!"});
                    });
                });
            });
        });



    // Add project for specific client
    // '/v1/client/project/add/:id'
    api.post('/projects/add/:id', authenticate, (req, res) => {
        Client.findById(req.params.id, (err, client) => {
            if (err) {
                res.send(err);
            }
            let newProject = new Project();

            newProject.name = req.body.name;
            newProject.sow = req.body.sow;
            newProject.startDate = new Date(req.body.startDate);

            newProject.client = client._id;
            newProject.save((err, project) => {
                if (err) {
                    res.send(err);
                }
                client.projects.push(newProject);
                client.save(err => {
                    if (err) {
                        res.send(err);
                    }
                    res.json({ message: "Client Project saved!"});
                });
            });
        });
    });


    // Get all projects for a specific client ID
    // '/v1/client/project/:id'
    api.get('/projects/:id', (req, res) => {
        Project.find({client: req.params.id}, (err, projects) => {
            if (err) {
                res.send(err);
            }
            res.json(projects);
        });
    });

    return api;
}
