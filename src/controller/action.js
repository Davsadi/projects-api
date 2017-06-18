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

    // Add action for specific task
    // '/v1/action/add/:id'
    api.post('/add/:id', authenticate, (req, res) => {
        Task.findById(req.params.id, (err, task) => {
            if (err) {
                res.send(err);
            }
            let newAction = new Action();

            newAction.name = req.body.name;
            newAction.detail = req.body.detail;
            newAction.addDate = new Date (req.body.addDate);
            newAction.dueDate = new Date (req.body.dueDate);
            newAction.status = req.body.status;
            newAction.link = req.body.link;
            newAction.image = req.body.image;
            newAction.task = task._id;
            newAction.stakeholder = req.body.stakeholderObjectID;
            newAction.save((err, action) => {
                if (err) {
                    res.send(err);
                }
                task.actions.push(newAction);
                task.save(err => {
                    if (err) {
                        res.send(err);
                    }
                    res.json({ message: "Task Action saved!"});
                });
            });
        });
    });


    // Get all actions
    // '/v1/action/'
    api.get('/', (req, res) => {
        Action.find({}, (err, actions) => {
            if (err) {
                res.send(err);
            }
            res.json(actions);
        });
    });



    // Get all actions for a specific task ID
    // '/v1/action/:id'
    api.get('/:id', (req, res) => {
        Action.find({client: req.params.id}, (err, tasks) => {
            if (err) {
                res.send(err);
            }
            res.json(tasks);
        });
    });

    // '/v1/action:id' - Update
    api.put('/:id', authenticate, (req, res) => {
        Task.findById(req.params.id, (err, client) => {
            if (err) {
                res.send(err);
            }
            Task.name = req.body.name;
            Task.name = req.body.name;
            Task.detail = req.body.detail;
            Task.dueDate = new Date(req.body.dueDate);
            Task.archive = req.body.archive;
            client.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "Task updated successfully" });
            });
        });
    });




    return api;
}
