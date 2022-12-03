const fs = require('fs');
const path = require('path');
const selfsigned = require('selfsigned');

const generateSelfSignedSSL = async () => {
    try {
        const attrs = [{ name: 'commonName', value: 'revbits.com' }];
        const pems = selfsigned.generate(attrs, { days: 365 });
        const fileStoragePath = process.env.FILE_STORAGE_PATH || process.cwd();
        const privateKey = path.join(fileStoragePath, 'ssl/');
        const certificatePath = path.join(fileStoragePath, 'ssl/');
        if (!fs.existsSync(privateKey)) {
            fs.mkdirSync(privateKey, { recursive: true });
        }
        fs.writeFileSync(`${privateKey}localhost.key`, pems.private);
        if (!fs.existsSync(certificatePath)) {
            fs.mkdirSync(certificatePath, { recursive: true });
        }
        fs.writeFileSync(`${certificatePath}localhost.crt`, pems.cert);

        return true;
    } catch (error) {
        console.log(error);
        return '';
    }
};
generateSelfSignedSSL();
console.log('Self signed certificate generated and stored in ssl folder !!');
module.exports = {
    generateSelfSignedSSL,
};
