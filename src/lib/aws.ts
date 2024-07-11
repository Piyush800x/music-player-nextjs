import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';

export const s3Client = new S3Client({
  region: `${process.env.AWS_REGION}`,
  credentials: {
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
  },
  endpoint: "https://s3.ap-southeast-1.wasabisys.com"
});

export async function getMusicURL(key: any) {
    const command = new GetObjectCommand({
      Bucket: "musics",
      Key: key
    });
    const url = await getSignedUrl(s3Client, command);
    return url;
}

export async function uploadToS3(key: string, body: any) {
  const command = new PutObjectCommand({
    Bucket: "musics",
    Key: key,
    Body: body
  });
  try {
    const response = await s3Client.send(command);
    return response;
  }
  catch (err) {
    return err;
  }
}