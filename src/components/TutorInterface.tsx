import React, {ChangeEvent} from "react";

interface TutorInterfaceProps {
  html?: string;
  onHtmlUpload: (event: ChangeEvent<HTMLInputElement>) => void;

  css?: string;
  onCssUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

function stitchHtmlAndCss(html: string, css: string) {
  const [head, rest] = html.split("</head>");
  return `
    ${head}
    <style>
      ${css}
      .active {
        border: 2px solid blue;
      }
    </style>
    <script>
        CTATConfiguration.set('question_file', origin + '/dummy.brd');
    </script>
    </head>
    ${rest}`;
}

function getBlobURL(code: string , type: string) {
  const blob = new Blob([code], { type })
  return URL.createObjectURL(blob)
}

function TutorInterface (props: TutorInterfaceProps) {
  const {
    html, onHtmlUpload,
    css, onCssUpload
  } = props;
  return (
    <>
      {
        css && html ? (
          <iframe
            id="tutor"
            title="tutor interface"
            sandbox="allow-same-origin allow-scripts"
            className="h-full w-full"
            src={getBlobURL(stitchHtmlAndCss(html, css), 'text/html')}
          />
        ) : (
          <>
            <p>Upload HTML:</p>
            <input type="file" name="file" onChange={onHtmlUpload} />
            <p>Upload CSS:</p>
            <input type="file" name="file" onChange={onCssUpload} />
          </>
        )
      }
    </>
  )
}

export default TutorInterface;
