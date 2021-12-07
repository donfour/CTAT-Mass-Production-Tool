import React, {useCallback, useState} from "react";
import {Cell, Row} from "./Editor";
import EditableCell from "./EditableCell";

interface TableRowProps {
  data: Row;
  editCell: (questionIndex: number, newCell: Cell) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function TableRow(props: TableRowProps) {
  //TODO: see if there's better way than passing callbacks to all rows?
  const {data: {cells}, editCell, ...callbacks} = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleIsExpanded = useCallback(() => setIsExpanded(isExpanded => !isExpanded), []);

  return (
    <>
      {/* input row */}
      <tr {...callbacks}>
        <td>
          <button onClick={toggleIsExpanded}>Expand</button>
        </td>
        <td>Input</td>
        {
          cells.map((cell, questionIndex) => (
            <td key={`${questionIndex}-${cell.input}`}>
              {
                questionIndex === 0 ? cell.input : (
                  <EditableCell
                    value={cell.input}
                    onFinishEdit={(newValue) => {
                      editCell(questionIndex, {
                        ...cell,
                        input: newValue,
                      })
                    }}
                  />
                )
              }
            </td>
          ))
        }
      </tr>
      {
        isExpanded && (
          <>
            {/* buggy message row */}
            <tr {...callbacks}>
              <td></td>
              <td>Buggy Message</td>
              {
                cells.map((cell, questionIndex) => (
                  <td key={`${questionIndex}-${cell.buggyMessage}`}>
                    {
                      questionIndex === 0 ? cell.buggyMessage : (
                        <EditableCell
                          value={cell.buggyMessage}
                          onFinishEdit={(newValue) => {
                            editCell(questionIndex, {
                              ...cell,
                              buggyMessage: newValue,
                            });
                          }}
                        />
                      )
                    }
                  </td>
                ))
              }
            </tr>
            {/* hint row(s) */}
            {
              cells[0].hints?.map((_: string, hintLevel: number) => (
                <tr key={hintLevel} {...callbacks}>
                  <td></td>
                  <td>Hint {hintLevel}</td>
                  {
                    cells.map((cell, questionIndex) => (
                      <td key={`${questionIndex}-${cell.hints[hintLevel]}`}>
                        {
                          questionIndex === 0 ? cell.hints[hintLevel] : (
                            <EditableCell
                              value={cell.hints[hintLevel]}
                              onFinishEdit={(newValue) => {
                                const newHints = [...cell.hints];
                                newHints[hintLevel] = newValue || "";

                                editCell(questionIndex, {
                                  ...cell,
                                  hints: newHints,
                                });
                              }}
                            />
                          )
                        }
                      </td>
                    ))}
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
