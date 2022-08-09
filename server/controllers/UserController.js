import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ userName: req.body.userName });

        if (!user) {
            return res.status(404).json({
                message: 'Utilizatorul nu a fost găsit',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if(!isValidPass) {
                return res.status(400).json({
                    message: 'Numele sau parola nu este corectă',
            });
        };

        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', {
            expiresIn: '30d',
        },
    );

    const { passwordHash, ... userData } = user._doc;

    res.json({
        ... userData,
        token,
    });
    } catch (error) {
         console.log(error)
        res.status(500).json({
            message: 'Logarea nu a reușit',
        });
    }
};

export const register = async (req, res) => {
    try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
        userName: req.body.userName,
        email: req.body.email,
        passwordHash: hash,
        avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();

    const token = jwt.sign({
        _id: user._id,
    }, 'secret123', {
        expiresIn: '30d',
    },
);

    const { passwordHash, ... userData } = user._doc;

    res.json({
        ... userData,
        token,
    });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Înregistrarea nu a reușit',
        });
    }
};

export const getMe = async (req, res) => {
    try {

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Utilizatorul nu a fost găsit'
            });
        }

        const { passwordHash, ... userData } = user._doc;

        res.json({userData});
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Nu există acces',
        });
    }
};
