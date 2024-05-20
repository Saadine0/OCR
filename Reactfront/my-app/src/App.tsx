import React from "react";
import "./App.css";
import DisplaySelectDoc from "./displaySelectedDoc/displaySelectDoc";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CarteVisiteAlgo from "./CarteVisite/CarteVisiteAlgo";
import YourComponent from "./CarteVisite/CarteVisiteEndPoint";
import Header from "./Header-Footer/header";
import ExtractedDataPage from "./Displaytext/extractedDataPage";
import FactureAlgo from "./Facture/FactureAlgo";
import AttestationAlgo from "./Attestation/AttestationAlgo";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/Facture" element={<FactureAlgo />} />
            
            <Route path="/Cartevisite" element={<CarteVisiteAlgo />} />

            <Route path="/Attestation" element={<AttestationAlgo />} />

            <Route path="/" element={<DisplaySelectDoc />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
