import React from "react";
import ExtractedTextComponent from "./ExtractedTextComponent";
import FactureEndpoint from "../Facture/FactureEndpoint";
import CarteVisiteEndpoint from "../CarteVisite/CarteVisiteEndPoint";

const ExtractedDataPage = ({ responseText, selectedFile, label }) => {
  return (
    <div className="flex items-center justify-center">
      {responseText && <ExtractedTextComponent responseText={responseText} />}

      {responseText && selectedFile && (
        <div className="p-6 w-96">
          {label.toLowerCase() === "facture" && (
            <FactureEndpoint selectedFile={selectedFile} />
          )}
          {label.toLowerCase() === "cartevisite" && (
            <CarteVisiteEndpoint selectedFile={selectedFile} />
          )}
        </div>
      )}
    </div>
  );
};

export default ExtractedDataPage;
