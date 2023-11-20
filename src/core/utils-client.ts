/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';

export async function uploadImage({ file, getPresignedURL }: UploadImageProp) {
  const {
    url,
    fields,
    imageKey: imageId,
  } = await getPresignedURL({ fileType: file.type });

  const formData = new FormData();
  const data = {
    ...fields,
    "Content-Type": file.type,
    file,
  };
  for (const key in data) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = data[key];
    formData.append(key, value as string | Blob);
  }

  // send fetch request to add image to s3 bucket
  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });
  console.log(res);

  return imageId;
}

// types
interface UploadImageProp {
  file: File;
  getPresignedURL: ({
    fileType,
  }: {
    fileType: string;
  }) => Promise<{ url: string; fields: Record<string, unknown>; imageKey: string }>;
}