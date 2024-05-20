import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy, FaFileDownload, FaCheckCircle } from "react-icons/fa";
import downloadTextAsTex from "./downloadtext";

const ExtractedTextComponent = ({ responseText }) => {
  const [copyStatus, setCopyStatus] = useState(false);

  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000); // Reset status after 2 seconds
  };

  return (
    <div className="border h-96 w-auto rounded">
      <div className="justify-self-end p-6">
        <h2 className="overline text-[#BF0404] font-mono">Extracted Text</h2>
        <div className="flex justify-end">
          <CopyToClipboard text={responseText} onCopy={onCopyText}>
            <button>
              <FaCopy className="size-6 text-[#BF0404]" />
            </button>
          </CopyToClipboard>
          {copyStatus && (
            <p className="justify-center flex items-center animate-pulse">
              <FaCheckCircle className="size-6" />
            </p>
          )}
          <button onClick={() => downloadTextAsTex(responseText)}>
            <FaFileDownload className="size-6 text-[#025949]" />
          </button>
        </div>
        <div className="p-6 text-left font-mono h-60 overflow-auto">
          {responseText.split(/\. /).map((sentence, index) => (
            <p key={index}>{sentence}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExtractedTextComponent;
