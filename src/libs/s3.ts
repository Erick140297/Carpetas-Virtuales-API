import "dotenv/config";
import { UploadedFile } from "express-fileupload";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as fs from "fs";

const client = new S3Client({
  region: process.env.AWS_BUCKET_REGION || "",
  credentials: {
    accessKeyId: process.env.AWS_IAM_PUBLIC_KEY || "",
    secretAccessKey: process.env.AWS_IAM_SECRET_KEY || "",
  },
});

export async function uploadFile(file: UploadedFile, key: string) {
  const stream = fs.createReadStream(file.tempFilePath);
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: stream,
  };
  const command = new PutObjectCommand(uploadParams);
  await client.send(command);
}

export async function getFileURL(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  return await getSignedUrl(client, command, { expiresIn: 3600 });
}

export async function deleteFileS3(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });
  const result = await client.send(command);
  return result;
}
