import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import {
    registerValidation,
    loginValidation,
    postCreateValidation
} from './validations/validation.js';
import { handleValidationErrors, checkAuth } from './utils/index.js';
import { UserControllers, PostControllers } from './controllers/index.js';
import multer from 'multer';
import cors from 'cors';

// DB connection
mongoose.connect('mongodb+srv://admin:123456!@spune.apuiol2.mongodb.net/spune?retryWrites=true&w=majority', )
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB ERROR', err));

const app = express();

// Image upload
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      if (!fs.existsSync('uploads')) {
        fs.mkdirSync('uploads');
      }
      cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
      cb(null, file.originalname);
    },
  });

const upload = multer({
    storage
});

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, UserControllers.login);

app.post('/auth/register', registerValidation, handleValidationErrors, UserControllers.register);

app.get('/auth/me', checkAuth, UserControllers.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get('/posts', PostControllers.getAll);
app.get('/tags', PostControllers.getLastTags);
app.get('/posts/:id', PostControllers.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostControllers.create);
app.delete('/posts/:id', checkAuth, PostControllers.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostControllers.update);


app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});