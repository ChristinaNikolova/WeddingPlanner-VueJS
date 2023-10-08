const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest, hasUser } = require('../middlewares/guards');
const { register, login, logout } = require('../services/auth');
const { errors: globalErrors } = require('../utils/constants/global');
const { user } = require('../utils/constants/model');
const { mapErrors } = require('../utils/parser');

router.post('/register', isGuest(),
    body('email').isEmail().withMessage(globalErrors.INVALID_EMAIL),
    body('password').isLength({ min: user.PASSWORD_MIN_LEN }).withMessage(globalErrors.PASSWORD(user.PASSWORD_MIN_LEN, user.PASSWORD_MAX_LEN)),
    body('password').isLength({ max: user.PASSWORD_MAX_LEN }).withMessage(globalErrors.PASSWORD(user.PASSWORD_MIN_LEN, user.PASSWORD_MAX_LEN)),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw mapErrors(errors);
            }

            const token = await register(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
            res.json(token);
        } catch (error) {
            const message = mapErrors(error);
            res.status(400).json({ message });
        }
    });

router.post('/login', isGuest(), async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);
        res.json(token);
    } catch (error) {
        const message = mapErrors(error);
        res.status(401).json({ message });
    }
});

router.get('/logout', hasUser(), async (req, res) => {
    try {
        const token = req.headers['x-authorization'].split(' ')[1];
        await logout(token);
        res.status(204).end();
    } catch (error) {
        const message = mapErrors(error);
        res.status(400).json({ message });
    }
});

module.exports = router;