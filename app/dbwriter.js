const { AWS } = require('./config/awsconfig');
const { TABLE_NAME, REGION } = require('./config/config');

AWS.config.region = REGION;

let db = new AWS.DynamoDB();

let writer = item => {
    return new Promise((resolve, reject) => {
        let params = {
            Item: item,
            TableName: TABLE_NAME
        };

        db.putItem(params).promise().then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
};

module.exports = {
    writer
};
