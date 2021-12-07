import React from "react";
import TutorInterface from "./TutorInterface";
import Editor from "./Editor";
import {Brd} from "../../types";

interface EditorPageProps {
  brd?: Brd;
  html?: string;
  css?: string;
}

function EditorPage(props: EditorPageProps) {
  const {brd, html, css} = props;
  return (
    <>
      <header className="p-2 bg-gray-800 text-white">
        CTAT Mass Production Tool
      </header>
      <div className="flex w-screen h-full">
        <div className="flex-1 h-screen overflow-y-auto border-r-2">
          <TutorInterface html={html} css={css}/>
        </div>
        <div className="flex-1 h-screen overflow-y-auto">
          <Editor brd={brd}/>
        </div>
      </div>
    </>
  )
}

export default EditorPage;
