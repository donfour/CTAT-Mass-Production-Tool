import React from "react";

interface TutorInterfaceProps {
  html?: string;
  css?: string;
}

function stitchHtmlAndCss(html: string, css: string) {
  const [head, rest] = html.split("</head>");
  return `
    ${head}
    <style>
      ${css || ""}
      .active {
        border: 2px solid blue;
      }
    </style>
    <script>
        // A hack to make the page work on Github Pages
        const url = origin === 'https://donfour.github.io' ? 'https://donfour.github.io/CTAT-Mass-Production-Tool' : origin
        CTATConfiguration.set('question_file', url + '/dummy.brd');
    </script>
    </head>
    ${rest}`;
}

function getBlobURL(code: string, type: string) {
  const blob = new Blob([code], {type});
  return URL.createObjectURL(blob);
}

function TutorInterface(props: TutorInterfaceProps) {
  const {html, css} = props;
  return html && css ? (
    <iframe
      id="tutor"
      title="tutor interface"
      sandbox="allow-same-origin allow-scripts"
      className="h-full w-full"
      src={getBlobURL(stitchHtmlAndCss(html, css), 'text/html')}
    />
  ) : null;
}

export default TutorInterface;
