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
    formData.append(key, data[key]);
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
  }) => Promise<{ url: string; fields: Record<string, any>; imageKey: string }>;
}