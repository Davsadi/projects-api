import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import client from '../controller/client';
import account from '../controller/account';
import project from '../controller/project';
import stakeholder from '../controller/stakeholder';
import task from '../controller/task';
import action from '../controller/action';
import note from '../controller/note';

let router = express();

// connect to db
initializeDb(db => {

    // internal middleware
    router.use(middleware({ config, db }));

    // api routes v1 (/v1)
    router.use('/client', client({ config, db }));
    router.use('/account', account({ config, db }));
    router.use('/project', project({ config, db }));
    router.use('/task', task({ config, db }));
    router.use('/action', action({ config, db }));
    router.use('/stakeholder', stakeholder({ config, db }));
    router.use('/note', note({ config, db }));

})

export default router;
