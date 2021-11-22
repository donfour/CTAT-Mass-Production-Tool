import React, {ChangeEvent} from "react";

interface TutorInterfaceProps {
  html?: string;
  onHtmlUpload: (event: ChangeEvent<HTMLInputElement>) => void;

  css?: string;
  onCssUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

function stitchHtmlAndCss(html: string, css: string) {
  const [head, rest] = html.split("</head>");
  return `${head}<style>${css}</style></head>${rest}`;
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
          <div dangerouslySetInnerHTML={{__html: stitchHtmlAndCss(html, css)}} />
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
