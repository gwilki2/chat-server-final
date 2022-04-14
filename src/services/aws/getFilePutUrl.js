const { S3 } = require('aws-sdk')
//const AWS = require('aws-sdk')
const { v1 } = require('uuid')
const {accessKeyId, secretAccessKey, region, bucketName: Bucket} = require('../../config/awsConfig')

const s3 = new S3({
    accessKeyId,
    secretAccessKey, 
    region
})

module.exports = (fileNameKey, ContentType) =>  s3.getSignedUrl(
    'putObject', 
    {
        Bucket,
        ContentType,
        Key: fileNameKey,
        Expires: 90
    }
)