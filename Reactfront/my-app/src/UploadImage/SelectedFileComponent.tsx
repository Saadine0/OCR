import { FaTrashAlt } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";

const SelectedFileComponent = ({
  selectedFile,
  onDeleteImage,
  isImageExpanded,
  setIsImageExpanded,
  handleExtractText,
  loading,
}) => {
  return (
    <div className="flex justify-center mt-4 p-6">
      <div className="relative">
        <img
          className={`animate-rotate-y animate-once rounded-lg object-contain max-w-lg transition-all duration-300 cursor-pointer  ${
            isImageExpanded ? "h-96 w-72" : "h-32 w-32"
          }`}
          src={URL.createObjectURL(selectedFile)}
          alt="image description"
          onClick={() => setIsImageExpanded(!isImageExpanded)}
        />
      </div>
      <div className="flex items-center space-x-4 ml-4">
        <button
          onClick={onDeleteImage}
          className="text-white h-16 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          <FaTrashAlt />
        </button>
        {/* Change the link to the desired path */}
        <button
          className="w-72 h-16 opacity-75  text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2bg-[#025949]  hover:bg-[#025949]flex items-center"
          onClick={handleExtractText}
          disabled={loading} // Disable the button while processing
        >
          {loading ? (
            <>
              <div className="flex">
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 6.627 5.373 12 12 12v-4c-2.962 0-5.614-1.062-7.71-2.709l1.292-1.292zm15.416-8.584A7.965 7.965 0 0120 12h4c0-6.627-5.373-12-12-12v4c2.962 0 5.614 1.062 7.71 2.709l-1.292 1.292z"
                  ></path>
                </svg>
                Processing...
              </div>
            </>
          ) : (
            <div className="flex items-center">
              <h1 className="px-6 ">Convertir en Text</h1>
              <IoSendSharp />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default SelectedFileComponent;
