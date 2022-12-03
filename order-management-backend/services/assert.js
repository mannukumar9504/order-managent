const { BaseError } = require('./errors');

const Assert = {
    isTruthy(_cond) {
    // Casting boolean and integer strings
        let cond = +_cond;

        if (Number.isNaN(Number(cond))) {
            if (typeof _cond === 'undefined') {
                // Undefined is parsing to NaN too.
                cond = _cond;
            } else if (typeof _cond === 'function') {
                // See what function returns
                // TODO: what if user want to check against function definiation available or not?
                cond = _cond();
            } else if (typeof _cond === 'string') {
                // String is not empty even if only space
                cond = _cond.trim();
            } else if (Array.isArray(_cond)) {
                // Array is not empty
                cond = _cond.length;
            } else {
                // Object is not empty
                cond = Object.keys(_cond).length;
            }
        }
        return !!cond;
    },

    throwError(_error = BaseError, reject) {
        if (typeof _error === 'function') {
            if (reject) {
                reject(new _error());
            } else {
                throw new _error();
            }
        } else if (reject) {
            reject(_error);
        } else {
            throw _error;
        }
    },

    throwIf(_cond, _error = BaseError, reject = null) {
        return Assert.isTruthy(_cond) && Assert.throwError(_error, reject);
    },

    throwIfNot(_cond, _error = BaseError, reject = null) {
        return !Assert.isTruthy(_cond) && Assert.throwError(_error, reject);
    },
};

module.exports = Assert;
