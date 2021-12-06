import React, {useCallback, useState} from "react";
import {Row} from "./Editor";

interface TableRowProps {
  data: Row;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function TableRow(props: TableRowProps) {
  //TODO: see if there's better way than passing callbacks to all rows?
  const {data: {cells}, ...callbacks} = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleIsExpanded = useCallback(() => setIsExpanded(isExpanded => !isExpanded), []);

  return (
    <>
      <tr {...callbacks}>
        <td>
          <button onClick={toggleIsExpanded}>Expand</button>
        </td>
        <td>Input</td>
        {cells.map((cell, index) => <td key={`${index}-${cell.input}`}>{cell.input}</td>)}
      </tr>
      {
        isExpanded && (
          <>
            <tr {...callbacks}>
              <td></td>
              <td>Buggy Message</td>
              {cells.map((cell, index) => <td key={`${index}-${cell.buggyMessage}`}>{cell.buggyMessage}</td>)}
            </tr>
            {
              cells[0].hints?.map((_: string, hintLevel: number) => (
                <tr key={hintLevel} {...callbacks}>
                  <td></td>
                  <td>Hint {hintLevel}</td>
                  {cells.map((cell, index) => <td key={`${index}-${cell.hints[hintLevel]}`}>{cell.hints[hintLevel]}</td>)}
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
