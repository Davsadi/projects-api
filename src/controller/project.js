import mongoose from 'mongoose';
import { Router } from 'express';
import Client from '../model/client';
import Project from '../model/project';
import Stakeholder from '../model/stakeholder';
import Task from '../model/task';
import Action from '../model/action';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
    let api = Router();


    // Add project for specific client
    // '/v1/project/add/:id'
    api.post('/add/:id', authenticate, (req, res) => {
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

    // Get all projects
    // '/v1/project/'
    api.get('/', (req, res) => {
        Project.find({}, (err, projects) => {
            if (err) {
                res.send(err);
            }
            res.json(projects);
        });
    });


    // Get all projects for a specific client ID
    // '/v1/project/:id'
    api.get('/:id', (req, res) => {
        Project.find({client: req.params.id}, (err, projects) => {
            if (err) {
                res.send(err);
            }
            res.json(projects);
        });
    });


    // '/v1/project:id' - Update
    api.put('/:id', authenticate, (req, res) => {
        Project.findById(req.params.id, (err, client) => {
            if (err) {
                res.send(err);
            }
            Project.name = req.body.name;
            Project.sow = req.body.sow;
            Project.startDate = new Date(req.body.startDate);
            Project.archive = req.body.archive;
            Project.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "Project updated successfully" });
            });
        });
    });



    return api;
}
