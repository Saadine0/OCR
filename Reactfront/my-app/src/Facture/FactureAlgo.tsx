import React, { useState } from "react";
import UploadComponent from "../UploadImage/UploadComponenet";
import ExtractedDataPage from "../Displaytext/extractedDataPage";

const FactureAlgo: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [responseText, setResponseText] = useState<string>("");
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [textToCopy, setTextToCopy] = useState("");
  const [copyStatus, setCopyStatus] = useState(false);
  const [extractedEntities, setExtractedEntities] = useState<{
    gmail: string[];
    phoneNumbers: string[];
    websites: string[];
  }>({
    gmail: [],
    phoneNumbers: [],
    websites: [],
  });

  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  return (
    <div className="p-16 grid App">
      <UploadComponent
        setSelectedFile={setSelectedFile}
        setUploadStatus={setUploadStatus}
        setUploadSuccess={setUploadSuccess}
        uploadStatus={uploadStatus}
        uploadSuccess={uploadSuccess}
        selectedFile={selectedFile}
        setIsExtracting={setIsExtracting}
        setMessage={setMessage}
        setResponseText={setResponseText}
        responseText={responseText}
        setExtractedEntities={setExtractedEntities}
      />
      <div className="flex items-center justify-center">
        <ExtractedDataPage
          label="facture"
          responseText={responseText}
          selectedFile={selectedFile}
        />
      </div>
    </div>
  );
};

export default FactureAlgo;
