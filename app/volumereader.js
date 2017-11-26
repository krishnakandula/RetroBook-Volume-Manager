const { AWS } = require('./config/awsconfig');
const fs = require('fs');
const uuid = require('uuid/v1');

let s3 = new AWS.S3();
let params = {
    Bucket: "retrobooktest",
};

const fileNames = {
    root: 'volumes',
    data: 'data.json',
    cover: 'cover.jpg',
    background: 'background.jpg'
}

let reader = (volume) => {
    return new Promise((resolve, reject) => {
        Promise.all([getVolumeData(`${fileNames.root}/${volume}`, fileNames.data)])
            .then(info => {
                let data = info[0];
                resolve({
                    id: uuid(),
                    title: data.title,
                    author: data.author,
                    info: data.info,
                    text: data.text
                });
            }).catch(err => {
                console.error('Unable to retrieve info from S3', err);
            });
    });
};

function getVolumeData(volume, dataFile) {
    return new Promise((resolve, reject) => {
        params.Key = `${volume}/${dataFile}`;
        s3.getObject(params).promise().then(file => {
            let data = file.Body.toString('utf8');
            resolve(JSON.parse(data));
        }, err => {
            reject(err);
        });
    });
}

function getSignedImageUrl(path, volume, fileName) {

}

module.exports = {
    reader
};
