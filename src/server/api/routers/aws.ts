import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { randomUUID } from "crypto";

export const accessKey= process.env.ACCESS_KEY;
export const secretAccessKey= process.env.SECRET_ACCESS_KEY;
export const bucketName= process.env.BUCKET_NAME;
export const bucketRegion= process.env.BUCKET_REGION;

export const s3Client = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId: accessKey!,
    secretAccessKey: secretAccessKey!,
  }
});


export const awsRouter = createTRPCRouter({
  getPresignedURL: protectedProcedure
    .input(z.object({fileType: z.string()}))
    .mutation(async ({input}) => {
      const ext = input.fileType.split('/').pop();
      const imageKey = randomUUID() + `.${ext}`;

      const presignedUrl = await createPresignedPost(s3Client, {
        Bucket: bucketName!,
        Key: imageKey,
        Fields: {
          key: imageKey,
        },
        Expires: 60,
        Conditions: [
          ["starts-with", "$Content-Type", "image/"],
          ["content-length-range", 0, 1000000],
        ],
      });

      return {url: presignedUrl.url, fields: presignedUrl.fields, imageKey};
    }),
});