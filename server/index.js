import express from 'express';
import mongoose from 'mongoose';
import {
    registerValidation,
    loginValidation,
    postCreateValidation
} from './validations/validation.js';
import checkAuth from './utils/checkAuth.js';
import * as UserControllers from './controllers/UserController.js';
import * as PostControllers from './controllers/PostController.js';

mongoose.connect('mongodb+srv://admin:123456!@spune.apuiol2.mongodb.net/spune?retryWrites=true&w=majority', )
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB ERROR', err));

const app = express();