import ImageKit from "imagekit";
import sharp from "sharp";
import getDate from "@/utils/getDate";

const imagekit = new ImageKit({
  publicKey:
    process.env.IMAGEKIT_PUBLIC_KEY ||
    (() => {
      throw new Error("IMAGEKIT_PUBLIC_KEY is not defined");
    })(),
  privateKey:
    process.env.IMAGEKIT_PRIVATE_KEY ||
    (() => {
      throw new Error("IMAGEKIT_PRIVATE_KEY is not defined");
    })(),
  urlEndpoint: "https://ik.imagekit.io" + process.env.IMAGEKIT_PUBLIC_KEY,
});

// Upload image to ImageKit and return the URL and image ID
interface UploadImageResult {
  url: string;
  imgId: string;
}

const uploadImage = async (
  file: Express.Multer.File,
  noCrop: boolean
): Promise<UploadImageResult> => {
  try {
    let resizedImageBuffer: Buffer;
    if (noCrop) {
      resizedImageBuffer = await sharp(file.buffer)
        .webp({ quality: 80 }) // Convert to WebP format
        .toBuffer();
    } else {
      resizedImageBuffer = await sharp(file.buffer)
        .resize({ width: 600, height: 600, fit: "cover" }) // Resize to 600x600
        .webp({ quality: 80 }) // Convert to WebP format
        .toBuffer();
    }

    const uploadedImage = (await imagekit.upload({
      file: resizedImageBuffer,
      fileName: `${Date.now()}-${file.originalname}`,
    })) as { url: string; fileId: string };

    const url: string = uploadedImage.url;

    return { url, imgId: uploadedImage.fileId };
  } catch (err) {
    console.log("Error uploading image - ", getDate(), "\n---\n", err);
    throw err;
  }
};

// Upload multiple images to ImageKit and return the URLs and image IDs
interface UploadedImage {
  url: string;
  imgId: string;
}

const uploadMultipleImages = async (
  files: Express.Multer.File[]
): Promise<UploadedImage[]> => {
  try {
    const uploadedImages: UploadedImage[] = await Promise.all(
      files.map(async (file: Express.Multer.File): Promise<UploadedImage> => {
        const convertedImageBuffer: Buffer = await sharp(file.buffer)
          .webp({ quality: 80 }) // Convert to WebP format
          .toBuffer();

        const uploadedImage = await imagekit.upload({
          file: convertedImageBuffer,
          fileName: `${Date.now()}-${file.originalname}-${Math.floor(
            Math.random() * 1000
          )}`,
        });

        const { url, fileId } = uploadedImage as {
          url: string;
          fileId: string;
        };

        return { url, imgId: fileId };
      })
    );

    const gallery: UploadedImage[] = uploadedImages.map(
      (image: UploadedImage) => ({
        url: image.url,
        imgId: image.imgId,
      })
    );

    return gallery;
  } catch (err) {
    console.log("Error uploading images - ", getDate(), "\n---\n", err);
    throw err;
  }
};

const deleteImage = async (imageId: string) => {
  try {
    await imagekit.deleteFile(imageId, (err: Error | null) => {
      if (err) {
        console.log("Error deleting image - ", getDate(), "\n---\n", err);
        throw new Error("Failed to delete image.");
      }

      console.log("Image deleted successfully -", getDate(), "\n---\n");
    });
  } catch (err) {
    console.log("Error deleting image - ", getDate(), "\n---\n", err);
    throw err;
  }
};

export { uploadImage, uploadMultipleImages, deleteImage };
