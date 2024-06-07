import React, { useState } from "react";

const GuidepopUp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed  top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-75 z-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white p-6 rounded-md animate-fade-right animate-once">
            <h2 className="text-lg font-semibold mb-4">Comment Utiliser l'application</h2>
            <p className="mb-2">1- Sélectionnez le type de fichier</p>
            <p className="mb-2">2- Cliquez sur le bouton « Choisir votre Document » pour sélectionner un fichier.</p>
            <p className="mb-2">3- Cliquez sur le bouton "Extraire les entités" pour lancer l'extraction.</p>
            <button
              className="mt-4 bg-[#025949] text-white px-4 py-2 rounded hover:bg-[#319381]"
              onClick={handleClose}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GuidepopUp;
