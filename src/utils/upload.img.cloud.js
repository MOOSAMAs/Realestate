import pkg from 'cloudinary';

const { v2: cloudinary } = pkg;

export const uploadImageToCloudinary = async (filePath) => {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "realestate",
      });
      return result.secure_url;
    } catch (error) {
      throw new Error("Cloudinary upload error: " + error.message);
    }
  };
