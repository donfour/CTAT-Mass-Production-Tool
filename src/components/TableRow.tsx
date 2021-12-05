import React, {useCallback, useState} from "react";
import {Row} from "./Editor";

interface TableRowProps {
  data: Row;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function TableRow(props: TableRowProps) {
  //TODO: see if there's better way than passing callbacks to all rows?
  const {data, ...callbacks} = props;
  const {input, buggyMessage, hints} = data;

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleIsExpanded = useCallback(() => setIsExpanded(isExpanded => !isExpanded), []);

  return (
    <>
      <tr {...callbacks}>
        <td>
          <button onClick={toggleIsExpanded}>Expand</button>
        </td>
        <td>Input</td>
        <td>{input}</td>
      </tr>
      {
        isExpanded && (
          <>
            <tr {...callbacks}>
              <td></td>
              <td>Buggy Message</td>
              <td>{buggyMessage}</td>
            </tr>
            {
              hints?.map((hint: string, index: number) => (
                <tr key={`${index}-${hint}`} {...callbacks}>
                  <td></td>
                  <td>Hint {index}</td>
                  <td>{hint}</td>
                </tr>
              ))
            }
          </>
        )
      }
    </>
  )
}

export default TableRow;
