const { parseToken } = require("../services/auth");
const { errors } = require("../utils/constants/global");

module.exports = () => async (req, res, next) => {
    const token = (req.headers['x-authorization'])?.split(' ')[1];

    if (token) {
        try {
            const payload = await parseToken(token);
            req.user = payload;
            req.token = token;
        } catch (err) {
            return res.status(401).json({ message: errors.TOKEN_INVALID });
        }
    }

    next();
};