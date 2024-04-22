import React, { useState } from 'react';
import axios from 'axios';

function Post_Image() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('profile', selectedFile); // Use the field name specified in your Multer configuration
    console.log(formData)
    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage(response.data.message);
      setResponseText(response.data.extractedText);
      console.log(response.data.extractedText);
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error during OCR operation');
    }
  };

  return (
    <div className="App">
      <div>
        <center>
          <h2>Upload</h2>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload Image</button>
          <hr />
          <h2>Preview</h2>
          {selectedFile && (
            <img src={URL.createObjectURL(selectedFile)} height="200" width="200" alt="preview" />
          )}
          {message && <p>{message}</p>}
          {responseText && (
            <div>
              <h2>Extracted Text</h2>
              <p>{responseText}</p>
            </div>
          )}
        </center>
      </div>
    </div>
  );
}

export default Post_Image;
