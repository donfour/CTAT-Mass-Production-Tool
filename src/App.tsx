import React, {useCallback, useState} from 'react';
import X2JS from 'x2js';
import {Brd} from "./types";
import LandingPage from "./pages/landing/LandingPage";
import EditorPage from "./pages/editor/EditorPage";

const x2js = new X2JS();

function App() {
  const [brd, setBrd] = useState<Brd>();
  const [html, setHtml] = useState<string>();
  const [css, setCss] = useState<string>();

  const [isEditorLaunched, setIsEditorLaunched] = useState(false);

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

  return isEditorLaunched ? (
    <EditorPage
      brd={brd}
      html={html}
      css={css}
    />
  ) : (
    <LandingPage
      brd={brd}
      html={html}
      css={css}
      onBrdUpload={onBrdUpload}
      onHtmlUpload={onHtmlUpload}
      onCssUpload={onCssUpload}
      onEditorLaunch={() => setIsEditorLaunched(true)}
    />
  );
}

export default App;
