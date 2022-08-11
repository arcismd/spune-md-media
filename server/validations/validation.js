import { body } from 'express-validator';

export const loginValidation = [
    body('password', 'Parola nu corespunde ori este prea scurtă').isLength({ min: 6 }), 
    body('userName', 'Numele este incorect').isLength({ min: 3 }),
];

export const registerValidation = [
    body('email', 'Poșta are un format incorect').isEmail(),
    body('password', 'Parola este prea scurtă').isLength({ min: 6 }), 
    body('userName', 'Introdu un nume compus din minim 3 caractere').isLength({ min: 3 }),
    body('avatarUrl', 'Adresă greșită pentru poza de profil').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Introduceţi denumirea titlului').isLength({ min: 3 }).isString(),
    body('text', 'Introduceţi textul pentru articol').isLength({ min: 10 }).isString(), 
    body('tags', 'Tag-urile introduse greșit').optional().isLength({ max: 3 }).isString(),
    body('imageUrl', 'Adresă greșită pentru imagine').optional().isString(),
];