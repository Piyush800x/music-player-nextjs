import { S3Client, GetObjectCommandOutput } from '@aws-sdk/client-s3'


const s3 = new S3Client({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// export const listObjects = async (bucketName: string) => {
//   const params = {
//     Bucket: bucketName,
//   };
//   return s3(params).promise();
// };

export const getObject = async (bucketName: string, key: string) => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };
  return s3.send(new GetObjectCommand(params)).promise();
};
