import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setProcessedImage(response.data.processed_image);
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };

  return (
    <div>
      <h1>Transportation Object Detection</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>
      <div>
        <h2>Original Image</h2>
        {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Original" />}
      </div>
      <div>
        <h2>Processed Image</h2>
        {processedImage && <img src={`data:image/jpeg;base64,${processedImage}`} alt="Processed" />}
      </div>
    </div>
  );
}

export default App;
