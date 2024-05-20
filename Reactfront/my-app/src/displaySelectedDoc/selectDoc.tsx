import React from "react";

function SelectDoc({ icon, label }) {
  const getPath = (label) => {
    switch (label.toLowerCase()) {
      case 'facture':
        return '/Facture';
      case 'cartevisite':
        return '/Cartevisite';
        case 'attestation':
        return '/Attestation';
      default:
        return '/'; // Fallback path
    }
  };

  const path = getPath(label);

  return (
    <div className="max-w-sm w-64 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition-transform hover:scale-105">
      <a href="#">
        <h5 className="mb-2 font-serif text-2xl p-6 font-bold tracking-tight text-[#BF0404] dark:text-white text-center">
          {label}
        </h5>
      </a>
      <div className="flex justify-center mb-4">
        <div className="text-center">
          <a href={path}>
            {icon &&
              React.cloneElement(icon, {
                className: "text-9xl text-[#025949]",
              })}
          </a>
        </div>
      </div>
    </div>
  );
}

export default SelectDoc;
