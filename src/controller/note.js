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



    return api;
}
