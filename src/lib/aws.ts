import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
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
