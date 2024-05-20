import { ChangeEvent } from "react";
import axios from "axios";

const handleFileChange = (
  e: ChangeEvent<HTMLInputElement>,
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
  setUploadStatus: React.Dispatch<React.SetStateAction<string>>,
  setUploadSuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (e.target.files && e.target.files.length > 0) {
    const file = e.target.files[0];
    setSelectedFile(file);
    const imageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ];
    if (imageTypes.includes(file.type)) {
      setUploadStatus("Uploaded well !");
      setUploadSuccess(true);
    } else {
      setUploadStatus("Error: Please select an image file.");
      setUploadSuccess(false);
    }
  } else {
    setUploadStatus("Please select a file.");
    setUploadSuccess(false);
  }
};

const handleUpload = async (
  selectedFile: File | null,
  setIsExtracting: React.Dispatch<React.SetStateAction<boolean>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setResponseText: React.Dispatch<React.SetStateAction<string>>,
  extractEntities: (text: string) => void
) => {
  if (!selectedFile) {
    return;
  }
  setIsExtracting(true);
  const formData = new FormData();
  formData.append("profile", selectedFile); // Keep the key as "profile" for the upload endpoint
  try {
    const response = await axios.post<{
      message: string;
      extractedText: string;
    }>("http://localhost:3000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setMessage(response.data.message);
    setResponseText(response.data.extractedText);
    // Extract Gmail addresses, phone numbers, and websites here
    extractEntities(response.data.extractedText);
  } catch (error) {
    console.error("Error:", error);
    setMessage("Error during OCR operation");
  } finally {
    setIsExtracting(false);
  }
};

export { handleFileChange, handleUpload };
