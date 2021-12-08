import React, {ChangeEvent, useCallback, useMemo, useState} from "react";

import htmlIcon from "../../assets/html-icon.png";
import brdIcon from "../../assets/brd-icon.png";
import htmlIconSmall from "../../assets/html-icon-small.png";
import brdIconSmall from "../../assets/brd-icon-small.png";
import cssIconSmall from "../../assets/css-icon-small.png";
import checkIcon from "../../assets/check-icon.svg";
import {Brd} from "../../types";

import UploadButton from "./UploadButton";
import Button from "../../components/Button";

interface LandingPageProps {
  brd?: Brd;
  html?: string;
  css?: string;
  onBrdUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onHtmlUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onCssUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onEditorLaunch: () => void;
}

function LandingPage(props: LandingPageProps) {
  const {brd, html, css, onBrdUpload, onHtmlUpload, onCssUpload, onEditorLaunch} = props;
  const [htmlFileName, setHtmlFileName] = useState<string>();
  const [cssFileName, setCssFileName] = useState<string>();
  const [brdFileName, setBrdFileName] = useState<string>();

  const isTutorReady = useMemo(() => html && brd, [html, brd]);

  const handleHtmlUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setHtmlFileName(event?.target?.files?.[0]?.name);
    onHtmlUpload(event);
  }, [onHtmlUpload]);

  const handleCssUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setCssFileName(event?.target?.files?.[0]?.name);
    onCssUpload(event);
  }, [onCssUpload]);

  const handleBrdUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setBrdFileName(event?.target?.files?.[0]?.name);
    onBrdUpload(event);
  }, [onBrdUpload]);

  return (
    <div className="h-screen bg-blue-50 flex justify-center items-center">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-4xl text-primary font-bold">CTAT Mass Production Tool</h1>
        <h2 className="text-gray-500">Easy edit, fast produce!</h2>
        <div className="flex gap-5">
          <div className={`h-96 w-32rem flex flex-col items-center bg-white rounded-sm ${html ? "" : "border justify-center"} border-primary border-dashed gap-5 p-4`}>
            {
              !html && (
                <>
                  <img className="h-32 w-32" src={htmlIcon} alt="An icon for an HTML file"/>
                  <UploadButton onUpload={handleHtmlUpload}>Upload HTML</UploadButton>
                </>
              )
            }
            {
              html && (
                <div className="flex justify-between w-full border-b h-32">
                  <div className="flex items-center gap-3">
                    <img className="h-10 w-10" src={htmlIconSmall} alt="An icon for an HTML file"/>
                    {htmlFileName}
                    <img className="h-4 w-4" src={checkIcon} alt="An checkmark icon"/>
                  </div>
                  <UploadButton replace onUpload={handleHtmlUpload}/>
                </div>
              )
            }
            {
              html && !css && (
                <>
                  <div className="flex flex-col justify-center items-center gap-4 border border-primary border-dashed rounded-sm w-full h-full my-8">
                    If you have a CSS file (optional)
                    <UploadButton onUpload={handleCssUpload}>Upload CSS</UploadButton>
                  </div>
                </>
              )
            }
            {
              html && css && (
                <div className="flex justify-between w-full border-b h-32">
                  <div className="flex items-center gap-3">
                    <img className="h-10 w-10" src={cssIconSmall} alt="An icon for a CSS file"/>
                    {cssFileName}
                    <img className="h-4 w-4" src={checkIcon} alt="An checkmark icon"/>
                  </div>
                  <UploadButton replace onUpload={handleCssUpload}/>
                </div>
              )
            }
          </div>
          <div className={`h-96 w-32rem flex flex-col items-center bg-white ${brd ? "" : "border justify-center"} rounded-sm border-primary border-dashed gap-5 p-4`}>
            {
              brd ? (
                <div className="flex justify-between w-full border-b h-32">
                  <div className="flex items-center gap-3">
                    <img className="h-10 w-10" src={brdIconSmall} alt="An icon for a BRD file"/>
                    {brdFileName}
                    <img className="h-4 w-4" src={checkIcon} alt="An checkmark icon"/>
                  </div>
                  <UploadButton replace onUpload={handleBrdUpload}/>
                </div>
              ) : (
                <>
                  <img className="h-32 w-32" src={brdIcon} alt="An icon for a BRD file"/>
                  <UploadButton onUpload={handleBrdUpload}>Upload BRD</UploadButton>
                </>
              )
            }
          </div>
        </div>
        <Button onClick={onEditorLaunch} disabled={!isTutorReady}>Launch</Button>
      </div>
    </div>
  );
}

export default LandingPage;
