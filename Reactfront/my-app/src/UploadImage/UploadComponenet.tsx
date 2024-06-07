import React, { useState } from "react";
import axios from "axios";
import { handleFileChange, handleUpload } from "./fileutils";
import SelectedFileComponent from "./SelectedFileComponent";
import YourComponent from "../CarteVisite/CarteVisiteEndPoint";

interface UploadComponentProps {
  label: string,
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  setUploadStatus: React.Dispatch<React.SetStateAction<string>>;
  setUploadSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  uploadStatus: string;
  uploadSuccess: boolean;
  selectedFile: File | null;
  setIsExtracting: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setResponseText: React.Dispatch<React.SetStateAction<string>>;
  responseText: string;
  setExtractedEntities: React.Dispatch<
    React.SetStateAction<{
      gmail: string[];
      phoneNumbers: string[];
      websites: string[];
    }>
  >;
}

const UploadComponent: React.FC<UploadComponentProps> = ({
  label,
  setSelectedFile,
  setUploadStatus,
  setUploadSuccess,
  uploadStatus,
  uploadSuccess,
  selectedFile,
  setIsExtracting,
  setMessage,
  setResponseText,
  responseText,
  setExtractedEntities,
}) => {
  const [loading, setLoading] = useState(false);
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const onDeleteImage = () => {
    setSelectedFile(null);
    setResponseText("");
    setExtractedEntities({
      gmail: [],
      phoneNumbers: [],
      websites: [],
    });
  };

  const handleCarteVisiteExtraction = async (
    selectedFile: File,
    setExtractedEntities: any
  ) => {
    try {
      const formData = new FormData();
      formData.append("carteVisite", selectedFile);

      const response = await axios.post(
        "http://localhost:3000/cartevisite",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from /cartevisite:", response.data); // Log response data to console

      // Check if response.data has the expected structure
      if (response.data && response.data.extractedEntities) {
        setExtractedEntities(response.data.extractedEntities);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error extracting entities from cartevisite:", error);
    }
  };

  const handleExtractText = () => {
    setLoading(true);
    handleUpload(
      selectedFile,
      setIsExtracting,
      setMessage,
      setResponseText,
      () => {
        handleCarteVisiteExtraction(selectedFile!, setExtractedEntities);
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <button
        className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-[#BF0404] border-2 border-gray-300 cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl hover:bg-[#025949]"
        onClick={() => document.getElementById("dropzone-file")?.click()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8 text-2xl text-white dark:text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
          />
        </svg>
        <h2 className="mt-1 text-2xl font-bold tracking-wide text-white dark:text-gray-200">
          Sélectionner Votre { label}
        </h2>

        <input
          id="dropzone-file"
          type="file"
          onChange={(e) =>
            handleFileChange(
              e,
              setSelectedFile,
              setUploadStatus,
              setUploadSuccess
            )
          }
          className="hidden"
        />
      </button>

      {selectedFile && (
        <SelectedFileComponent
          selectedFile={selectedFile}
          onDeleteImage={onDeleteImage}
          isImageExpanded={isImageExpanded}
          setIsImageExpanded={setIsImageExpanded}
          handleExtractText={handleExtractText}
          loading={loading}
        />
      )}
    </div>
  );
};

export default UploadComponent;
