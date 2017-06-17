import mongoose from 'mongoose';
import { Router } from 'express';
import XXXXXX from '../model/xxxxxx';
import YYYYYY from '../model/yyyyyy';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
    let api = Router();

    // CRUD - Create Read Update Delete

    // '/v1/xxxxxx/add' - Create
    api.post('/add', authenticate, (req, res) => {
        let newXXXXXX = new XXXXXX();
        newXXXXXX.name = req.body.name;

        newXXXXXX.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({ message: "XXXXXX saved successfully" });
        });
    });

    // '/v1/xxxxxx/' - Read
    //Get all xxxxxxs
    api.get('/', (req, res) => {
        XXXXXX.find({}, (err, xxxxxxs) => {
            if (err) {
                res.send(err);
            }
            res.json(xxxxxxs);
        });
    });

    // '/v1/xxxxxx/:id' - Read
    //Get one xxxxxx
    api.get('/:id', (req, res) => {
        XXXXXX.findById(req.params.id, (err, xxxxxx) => {
            if (err) {
                res.send(err);
            }
            res.json(xxxxxx);
        });
    });

    // '/v1/xxxxxx/:id' - Update
    api.put('/:id', authenticate, (req, res) => {
        XXXXXX.findById(req.params.id, (err, xxxxxx) => {
            if (err) {
                res.send(err);
            }
            xxxxxx.name = req.body.name;

            xxxxxx.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "XXXXXX updated successfully" });
            });
        });
    });

    // '/v1/xxxxxx/:id' - Delete
    api.delete('/:id', authenticate, (req, res) => {
        XXXXXX.findById(req.params.id, (err, xxxxxx) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            if (xxxxxx === null) {
                res.status(404).send("XXXXXX not found");
                return;
            }
            XXXXXX.remove({
                _id: req.params.id
            }, (err, xxxxxx) => {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                YYYYYY.remove({
                    xxxxxx: req.params.id
                }, (err, yyyyyy) => {
                    if (err) {
                        res.send(err);
                    }
                    res.json({ message: "XXXXXX successfully removed!"});
                    });
                });
            });
        });



    // Add yyyyyy for specific xxxxxx
    // '/v1/xxxxxx/yyyyyy/add/:id'
    api.post('/yyyyyys/add/:id', authenticate, (req, res) => {
        XXXXXX.findById(req.params.id, (err, xxxxxx) => {
            if (err) {
                res.send(err);
            }
            let newYYYYYY = new YYYYYY();

            newYYYYYY.title = req.body.title;

            newYYYYYY.xxxxxx = xxxxxx._id;
            newYYYYYY.save((err, yyyyyy) => {
                if (err) {
                    res.send(err);
                }
                xxxxxx.yyyyyys.push(newYYYYYY);
                xxxxxx.save(err => {
                    if (err) {
                        res.send(err);
                    }
                    res.json({ message: "XXXXXX YYYYYY saved!"});
                });
            });
        });
    });


    // Get all yyyyyys for a specific xxxxxx ID
    // '/v1/xxxxxx/yyyyyy/:id'
    api.get('/yyyyyys/:id', (req, res) => {
        YYYYYY.find({xxxxxx: req.params.id}, (err, yyyyyys) => {
            if (err) {
                res.send(err);
            }
            res.json(yyyyyys);
        });
    });

    return api;
}
