import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import passErrorToHandler from '../utils/errors.js';
dotenv.config();

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  region: 'sa-east-1',
});

class S3Controller {
  //@description get a signed url
  //@ROUTE GET /api/upload
  //@access private/admin
  getSignedUrl(req, res, next) {
    const key = `${req.user._id}/${uuid()}.jpeg`;

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: process.env.BUCKET,
        ContentType: 'image/jpeg',
        Key: key,
      },
      (error, url) => {
        if (error) {
          passErrorToHandler(error, next);
        }
        res.send({ key, url });
      }
    );
  }

  //@description delete a image upload for a user
  //@ROUTE DELETE /api/s3/:uid/:id
  //@access private/admin
  deleteImage(req, res, next) {
    let userId = req.params.uid;
    let imageId = req.params.id;
    let key = `${userId}/${imageId}`;

    s3.deleteObject(
      {
        Bucket: process.env.BUCKET,
        Key: key,
      },
      (error, data) => {
        if (error) {
          return passErrorToHandler(error, next);
        }
        res.json(data);
      }
    );
  }
  //@description delete all the images upload for a particular user
  //@ROUTE DELETE /api/s3/:uid
  //@access private/admin

  async deleteImageFolder(req, res, next) {
    const dir = `${req.params.uid}/`;
    try {
      await emptyS3Directory(process.env.BUCKET, dir);
      res.send('folder deleted');
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }
}

async function emptyS3Directory(bucket, dir) {
  const listParams = {
    Bucket: bucket,
    Prefix: dir,
  };

  const listedObjects = await s3.listObjectsV2(listParams).promise();

  if (listedObjects.Contents.length === 0) return;

  const deleteParams = {
    Bucket: bucket,
    Delete: { Objects: [] },
  };

  listedObjects.Contents.forEach(({ Key }) => {
    deleteParams.Delete.Objects.push({ Key });
  });

  await s3.deleteObjects(deleteParams).promise();

  if (listedObjects.IsTruncated) await emptyS3Directory(bucket, dir);
}

export default S3Controller;
