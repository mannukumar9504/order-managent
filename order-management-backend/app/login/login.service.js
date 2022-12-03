const { issueToken } = require('../../utilities/middleware/jwt.token.service');

const loginOperation = async (userData) => {
    // eslint-disable-next-line no-use-before-define
    const jwtToken = issueJwt(userData);
    return { token: jwtToken.token };
};

const issueJwt = (userData) => {
    const tokenizeObj = {
        id: userData.id,
        email: userData.email,
        time: (new Date()).getTime(),
    };
    const tokenData = {
        token: issueToken(tokenizeObj, userData.password),
    };

    return tokenData;
};

module.exports = {
    loginOperation,
};
