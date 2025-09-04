export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const validateImage = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Formato de imagen no válido. Use JPG, PNG o GIF.');
  }

  const maxSize = 2 * 1024 * 1024; // 2MB
  if (file.size > maxSize) {
    throw new Error('La imagen no debe superar 2MB');
  }

  return true;
};