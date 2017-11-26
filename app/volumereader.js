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
        let filePath = `${fileNames.root}/${volume}`;
        getVolumeData(filePath, fileNames.data)
            .then(data => {
                resolve({
                    id: {
                        S: uuid()
                    },
                    title: {
                        S: data.title
                    },
                    author: {
                        S: data.author
                    },
                    info: {
                        S: data.info
                    },
                    text: {
                        S: data.text
                    },
                    coverImage: {
                        S: getSignedImageUrl(params.Bucket, fileNames.root, volume, fileNames.cover)
                    },
                    backgroundImage: {
                        S: getSignedImageUrl(params.Bucket, fileNames.root, volume, fileNames.background)
                    }
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

function getSignedImageUrl(bucket, rootFolder, volume, imageFile) {
    return `https://s3-us-west-2.amazonaws.com/${bucket}/${rootFolder}/${volume}/${imageFile}`
}

module.exports = {
    reader
};
