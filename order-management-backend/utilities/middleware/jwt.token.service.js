// eslint-disable-next-line import/no-unresolved
const jwt = require('jsonwebtoken');

const salt = 'ccB8985dC7cC1c5daF8a';
// With this method we generate a new token based on payload we want to put on it
const issueToken = (payload) => jwt.sign(
    payload, // This is the payload we want to put inside the token
    salt,
    { expiresIn: '7 days' },
);

// Here we verify that the token we received on a request hasn't be tampered with.
const verifyToken = (token) => {
    if (token) {
        return jwt.verify(
            token, // The token to be verified
            salt, // The secret we used to sign it.
        );
    }
    return '';
};

const decodeToken = (token) => jwt.decode(token);

module.exports = {
    issueToken,
    verifyToken,
    decodeToken,
};
