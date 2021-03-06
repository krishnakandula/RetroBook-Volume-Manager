const AWS = require('aws-sdk');
const {AWS_ACCESS_KEY_ID, AWS_SECRET_KEY} = require('./config');

AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_KEY,
});

module.exports = {
    AWS
};