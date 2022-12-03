const message = require(__basedir + '/config/status-message');

const { verifyToken } = require('./jwt.token.service');
/**
 * Method to extract and verify JWT token from HTTP headers
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next HTTP next callback method
 * */
// eslint-disable-next-line consistent-return
const authenticateUserWithToken = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;

        if (!auth) {
            return res.status(message.FORBIDDEN).send({ "message": message.UNAUTHORIZED_ACCESS });
        }
        const authParts = auth.split(' ');

        if (authParts.length !== 2) {
            return res.status(message.FORBIDDEN).send('Format is: Bearer <token>');
        }
        const [scheme, token] = authParts;

        if (new RegExp('^Bearer$').test(scheme)) {
            try {
                req.user = await verifyToken(token);
                return next();
            } catch (e) {
                return res.status(message.FORBIDDEN).send({ message: e.message });
            }
        } else {
            return res.status(message.FORBIDDEN).send({ message: 'Format is: Bearer <token>' });
        }
    } catch (err) {
        return res.status(message.INTERNAL_ERROR).send({ message: err });
    }
};

module.exports = {
    authenticateUserWithToken,
};
