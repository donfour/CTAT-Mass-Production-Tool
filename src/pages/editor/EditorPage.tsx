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
    <div className="h-screen flex flex-col flex-initial">
      <div className="p-2 bg-gray-800 text-white">
        CTAT Mass Production Tool
      </div>
      <div className="flex-auto flex">
        <div className="h-full w-half-screen">
          <TutorInterface html={html} css={css}/>
        </div>
        <div className="h-full w-half-screen">
          <Editor brd={brd}/>
        </div>
      </div>
    </div>
  )
}

export default EditorPage;
