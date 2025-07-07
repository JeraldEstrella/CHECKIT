import { useRef } from 'react';
import ImageKit from "imagekit-javascript";


const uploadImage = ({setPreviewImage, setSelectedFile}) => {
    const IKuploadRef = useRef(null);

    const handlePreviewFile = (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        if(!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
        setSelectedFile(file);
    };

  return (
   <>
      <input
        type="file"
        id="upload-input"
        style={{ display: "none" }}
        ref={IKuploadRef}
        onChange={handlePreviewFile}
        accept="image/*"
        className="upload-input"
      />
      <label htmlFor="upload-input" style={{ cursor: "pointer" }}>
        <img src="/attach.png" alt="" />
      </label>
    </>
  )
}

export async function handleImageUpload(file) {
  let signature, token, expire;
  try {
    const response = await fetch("http://localhost:3000/api/get/image-auth");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    signature = data.signature;
    token = data.token;
    expire = data.expire;
  } catch (error) {
    throw new Error(
      `Failed to fetch authentication parameters: ${error.message}`
    );
  }

  const imagekit = new ImageKit({
    publicKey: import.meta.env.VITE_IMAGE_PUBLIC_KEY,
    urlEndpoint: import.meta.env.VITE_IMAGEKIT_ENDPOINT,
  });

  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const result = await imagekit.upload({
    file: dataUrl,
    fileName: file.name,
    signature,
    token,
    expire,
  });

  return result.url; 
}

export default uploadImage;
