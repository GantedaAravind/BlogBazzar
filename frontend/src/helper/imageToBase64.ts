const imageToBase64 = (image: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result as string); // Type assertion for result as string
        } else {
          reject(new Error("Failed to convert image to base64"));
        }
      };
      
      reader.onerror = (error) => reject(error);
      
      reader.readAsDataURL(image);
    });
  };
  
  export default imageToBase64;
  