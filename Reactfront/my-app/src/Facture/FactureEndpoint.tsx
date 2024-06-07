import React, { useState } from "react";
import axios from "axios";

interface ResponseData {
  extractedFields: {
    facturéÀ: string | null;
    destinataireEntreprise: string | null;
    adresse: string | null;
    téléphone: string | null;
    email: string | null;
    dateFacture: string | null;
    numéroFacture: string | null;
    numéroCommande: string | null;
    référenceDevis: string | null;
    dateÉchéance: string | null;
    descriptionArticle: string | null;
    quantité: string | null;
    prixUnitaire: string | null;
    prixTotal: string | null;
    sousTotal: string | null;
    TVA: string | null;
    autresFrais: string | null;
    total: string | null;
    conditionsPaiement: string | null;
    IBAN: string | null;
    SWIFT: string | null;
    nomImprimé: string | null;
    dateSignature: string | null;
  };
}

interface YourComponentProps {
  selectedFile: File | null;
}

const FactureEndpoint: React.FC<YourComponentProps> = ({ selectedFile }) => {
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState<ResponseData | null>(null);
  const [isEdited, setIsEdited] = useState(false);

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("facture", selectedFile);

    try {
      setLoading(true);
      const response = await axios.post<ResponseData>(
        "http://localhost:3000/facture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResponseData(response.data);
      setEditableData(response.data);
      setIsEdited(false);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setResponseData(editableData);
    setIsEditing(false);
    setIsEdited(false);
  };

  const handleCancelClick = () => {
    setEditableData(responseData);
    setIsEditing(false);
    setIsEdited(false);
  };

  const handleChange = (field: string, value: string) => {
    if (!editableData) return;
    const updatedData = { ...editableData };
    updatedData.extractedFields[field] = value;
    setEditableData(updatedData);
    setIsEdited(JSON.stringify(updatedData) !== JSON.stringify(responseData));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <button
        onClick={handleUpload}
        className="w-72 h-16 animate-jump animate-thrice text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2bg-[#025949]  hover:bg-[#025949]flex items-center"
      >
        Extract Fature Entities
      </button>
      {loading && <p className="mt-4 text-black">Processing...</p>}
      {editableData && (
        <div className="mt-6 size-auto">
          <h2 className="text-xl font-semibold">Extracted Entities:</h2>
          <table className="mt-4 w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Field
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(editableData.extractedFields).map((field) => (
                <tr key={field}>
                  <td className="border border-gray-300 px-4 py-2 capitalize">
                    {field}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editableData.extractedFields[field] || ""}
                        onChange={(e) => handleChange(field, e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      editableData.extractedFields[field] || "None"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isEditing ? (
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleSaveClick}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleEditClick}
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-700"
              >
                Edit
              </button>
            </div>
          )}
          {isEdited && (
            <div className="mt-4 text-red-500">You have unsaved changes.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default FactureEndpoint;
