const downloadTextAsTex = (responseText: string) => {
  const element = document.createElement("a");
  const file = new Blob([responseText], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = "extracted_text.tex";
  document.body.appendChild(element); // Required for this to work in Firefox
  element.click();
};

export default downloadTextAsTex;
