import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Initialize S3 client with environment variables for sensitive information
const s3Client = new S3Client({
  region: process.env.MY_AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY as string,
  },
});

// Function to upload image to S3
async function uploadImageToS3(
  file: Buffer,
  fileName: string,
): Promise<string> {
  console.log("file, fileName for S3 upload:", file, fileName);
  const params = {
    Bucket: process.env.MY_AMPLIFY_BUCKET as string,
    Key: `${Date.now()}-${fileName}`,
    Body: file,
    ContentType: "image/jpeg",
  };

  console.log("Params for S3 upload:", params);

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return params.Key; // Return the S3 key (file path)
  } catch (error) {
    console.error("Error in uploadImageToS3:", error);
    throw error; // Re-throw error to be caught in the PUT handler
  }
}

export async function PUT(request: NextRequest) {
  console.log("Request received at:", new Date());

  try {
    const formData = await request.formData();

    if (!formData || !formData.has("files")) {
      console.log("Files blob is required.");
      return NextResponse.json(
        { error: "Files blob is required." },
        { status: 400 },
      );
    }

    const files = formData.getAll("files") as Blob[];
    const uploadResults: string[] = [];
    for (const file of files) {
      const mimeType = file.type;
      const fileExtension = mimeType.split("/")[1];
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = uuidv4() + "." + fileExtension;
      const s3Key = await uploadImageToS3(buffer, fileName);
      uploadResults.push(`https://d3q5ph1a1lg1pd.cloudfront.net/${s3Key}`);
    }
    return NextResponse.json({ success: true, imageUrls: uploadResults });
  } catch (error: any) {
    console.error("Error uploading images:", error);
    return NextResponse.json(
      { error: "Uploading images error" },
      { status: 500 },
    );
  }
}
