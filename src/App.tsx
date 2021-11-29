import React, {useCallback, useState} from 'react';
import X2JS from 'x2js';
import {Brd} from "./types";
import Editor from "./components/Editor";
import TutorInterface from "./components/TutorInterface";

const x2js = new X2JS();

function App() {
  const [brd, setBrd] = useState<Brd>();
  const [html, setHtml] = useState<string>();
  const [css, setCss] = useState<string>();

  const onBrdUpload = useCallback(async (event) => {
    const file = event.target.files[0];
    const xml = await file.text() as string;
    setBrd(x2js.xml2js(xml));
  }, []);

  const onHtmlUpload = useCallback(async (event) => {
    const file = event.target.files[0];
    const html = await file.text() as string;
    setHtml(html)
  }, []);

  const onCssUpload = useCallback(async (event) => {
    const file = event.target.files[0];
    const css = await file.text() as string;
    setCss(css)
  }, []);

  return (
    <div className="flex w-screen">
      <div className="flex-1 h-screen overflow-y-auto border-r-2">
        <TutorInterface
          html={html} onHtmlUpload={onHtmlUpload}
          css={css} onCssUpload={onCssUpload}
        />
      </div>
      <div className="flex-1 h-screen overflow-y-auto">
        <Editor brd={brd} onBrdUpload={onBrdUpload} />
      </div>
    </div>
  );
}

export default App;
