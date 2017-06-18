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


    // Add task for specific project
    // '/v1/task/add/:id'
    api.post('/add/:id', authenticate, (req, res) => {
        Project.findById(req.params.id, (err, project) => {
            if (err) {
                res.send(err);
            }
            let newTask = new Task();

            newTask.name = req.body.name;
            newTask.detail = req.body.detail;
            newTask.dueDate = new Date(req.body.dueDate);
            newTask.project = project._id;
            newTask.save((err, task) => {
                if (err) {
                    res.send(err);
                }
                project.tasks.push(newTask);
                project.save(err => {
                    if (err) {
                        res.send(err);
                    }
                    res.json({ message: "Project Task saved!"});
                });
            });
        });
    });


    // Get all tasks
    // '/v1/task/'
    api.get('/', (req, res) => {
        Task.find({}, (err, task) => {
            if (err) {
                res.send(err);
            }
            res.json(task);
        });
    });


    // Get all tasks for a specific project ID
    // '/v1/task/:id'
    api.get('/:id', (req, res) => {
        Task.find({client: req.params.id}, (err, tasks) => {
            if (err) {
                res.send(err);
            }
            res.json(tasks);
        });
    });


    // '/v1/task/:id' - Update
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
            Task.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "Task updated successfully" });
            });
        });
    });



    return api;
}
