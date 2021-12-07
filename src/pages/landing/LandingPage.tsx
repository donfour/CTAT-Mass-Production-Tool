import React from "react";
import brdIcon from "../../assets/brd-icon.png";
import htmlIcon from "../../assets/html-icon.png";
import uploadIcon from "../../assets/upload-icon.svg";

function UploadButton(props: React.HTMLProps<HTMLButtonElement>) {
  return (
    <button className="text-primary border rounded-sm border-gray-300 flex justify-center items-center gap-1 py-1.5 px-5">
      <img src={uploadIcon} alt="An upload icon"/>
      {props.children}
    </button>
  )
}

function LandingPage() {
  return (
    <div className="h-screen bg-blue-50 flex justify-center items-center">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-4xl text-primary font-bold">CTAT Mass Production Tool</h1>
        <h2 className="text-gray-500">Easy edit, fast produce!</h2>
        <div className="flex gap-5">
          <div className="flex flex-col items-center bg-white border rounded-sm border-primary border-dashed gap-5 px-32 py-20">
            <img className="h-32 w-32" src={htmlIcon} alt="An icon for an HTML file" />
            <UploadButton>Upload HTML</UploadButton>
          </div>
          <div className="flex flex-col items-center bg-white border rounded-sm border-primary border-dashed gap-5 px-32 py-20">
            <img className="h-32 w-32" src={brdIcon} alt="An icon for a BRD file" />
            <UploadButton>Upload BRD</UploadButton>
          </div>
        </div>
        <button className="bg-primary text-white rounded-sm px-6 py-1 filter drop-shadow-md">Launch</button>
      </div>
    </div>
  );
}

export default LandingPage;
