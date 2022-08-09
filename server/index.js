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
import multer from 'multer';

// DB connection
mongoose.connect('mongodb+srv://admin:123456!@spune.apuiol2.mongodb.net/spune?retryWrites=true&w=majority', )
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB ERROR', err));

const app = express();

// Image upload
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filnename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage
});

app.use(express.json());

app.post('/auth/login', loginValidation, UserControllers.login);

app.post('/auth/register', registerValidation, UserControllers.register);

app.get('/auth/me', checkAuth, UserControllers.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get('/posts', PostControllers.getAll);
app.get('/posts/:id', PostControllers.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostControllers.create);
app.delete('/posts/:id', checkAuth, PostControllers.remove);
app.patch('/posts/:id', checkAuth, PostControllers.update);


app.listen(3000, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});