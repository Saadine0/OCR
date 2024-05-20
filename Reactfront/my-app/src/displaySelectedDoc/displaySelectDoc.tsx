import { FaFileInvoice, FaFileAlt } from "react-icons/fa";
import { TiBusinessCard } from "react-icons/ti";
import SelectDoc from "./selectDoc";
import CarteVisiteAlgo from "../CarteVisite/CarteVisiteAlgo";
import Header from "../Header-Footer/header";

function DisplaySelectDoc() {
  return (
    <div className="flex items-center justify-center p-44 space-x-4">
      <SelectDoc  icon={<FaFileInvoice />} label="Facture" />
      <SelectDoc  icon={<TiBusinessCard />} label="Cartevisite" />
      <SelectDoc  icon={<FaFileAlt />} label="Attestation" />
    </div>
  );
}

export default DisplaySelectDoc;