import imageCompression from 'browser-image-compression';

export const processImage = async (imageFile) => {
  try {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(imageFile, options);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};