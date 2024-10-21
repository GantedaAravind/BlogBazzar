// Define the type for the image parameter
type ImageFile = File | Blob;

const url = `https://api.cloudinary.com/v1_1/dhmcyqyjt/image/upload`;

const uploadImage = async (image: ImageFile): Promise<any> => {
    const formData = new FormData();
    formData.append("file", image);  
    formData.append("upload_preset", "blog_images");
    

    const response = await fetch(url, {
        method: "POST",
        body: formData,
    });

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
        throw new Error('Image upload failed');
    }

    return response.json();
}

export default uploadImage;