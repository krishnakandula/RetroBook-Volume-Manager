const { AWS } = require('./config/awsconfig');
let s3 = new AWS.S3();

let params = {
    Bucket: "retrobooktest",
};

let reader = (path, volume) => {
    params.Key = `${path}${volume}`;
    s3.getObject(params).promise().then(file => {
        JSON.parse(file).then(obj => {
            console.log(obj);
            
        }, err => { console.error(err)});
    }, err => {
        console.error(err);
    });
};

module.exports = {
    reader
};
