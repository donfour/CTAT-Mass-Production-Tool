import React, {ChangeEvent, useCallback, useMemo, useState} from "react";
import {Brd} from "../types";
import TableRow from "./TableRow";

interface EditorProps {
  brd?: Brd;
  onBrdUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface Cell {
  input?: string;
  buggyMessage?: string;
  hints: string[];
}

export interface Row {
  id: string;
  selection?: string;
  cells: Cell[];
}

function onMouseEnter(id?: string) {
  if (id) {
    const iframe = document.getElementById("tutor");
    // @ts-ignore
    iframe?.contentWindow?.document?.getElementById(id)?.classList?.add('active');
  }
}

function onMouseLeave(id?: string) {
  if (id) {
    const iframe = document.getElementById("tutor");
    // @ts-ignore
    iframe?.contentWindow?.document?.getElementById(id)?.classList?.remove('active');
  }
}

function Editor(props: EditorProps) {
  const {brd, onBrdUpload} = props;

  const [questions, setQuestions] = useState<Cell[][]>();

  const initialRows: Row[] = useMemo(() => {
    return brd ? (
      brd.stateGraph.edge
        .filter(edge => edge.actionLabel.message.properties.Input.value !== "No_Value")
        .map(edge => {
          const properties = edge.actionLabel.message.properties;
          const {buggyMessage, hintMessage} = edge.actionLabel || {};

          return {
            id: edge.actionLabel.uniqueID,
            selection: properties.Selection.value,
            cells: [{
              input: properties.Input.value,
              buggyMessage,
              hints: typeof hintMessage === "string" ? [hintMessage] : !hintMessage ? [] : hintMessage,
            }]
          };
        })
    ) : [];
  }, [brd]);

  const rows: Row[] = initialRows.map((initialRow, index) => {
    return {
      id: initialRow.id,
      cells: [...initialRow.cells, ...(questions || []).map(question => question[index])],
    }
  });

  const addNewQuestion = useCallback(() => {
    setQuestions(existingQuestions => {
      return [
        ...(existingQuestions || []),
        // new question has same values as imported question by default
        initialRows.map(initialRow => initialRow.cells[0]),
      ];
    });
  }, [initialRows]);

  const editCell = useCallback((questionIndex: number, rowIndex: number, newCell: Cell) => {
    setQuestions(existingQuestions => {
      const newQuestions = [...(existingQuestions || [])];
      // questions does not contain imported question
      newQuestions[questionIndex-1][rowIndex] = newCell;
      return newQuestions;
    });
  }, []);

  return (
    <>
      {
        brd ? (
          <>
            <table>
              <thead>
              <tr>
                <th>Expand</th>
                <th>Type</th>
                <th>Imported Value</th>
                {
                  questions && questions.map((_, index) => {
                    return <th key={`question-${index}`}>Question {index + 2}</th>;
                  })
                }
              </tr>
              </thead>
              <tbody>
              {
                rows.map((row, rowIndex) => {
                  return (
                    <TableRow
                      key={row.id}
                      data={row}
                      editCell={(questionIndex, newCell) => editCell(questionIndex, rowIndex, newCell)}
                      onMouseEnter={() => onMouseEnter(row.selection)}
                      onMouseLeave={() => onMouseLeave(row.selection)}
                    />
                  )
                })
              }
              </tbody>
            </table>
            <button onClick={addNewQuestion}>+ Add Question</button>
          </>
        ) : (
          <>
            <input type="file" name="file" onChange={onBrdUpload}/>
            <p>Please select a brd file</p>
          </>
        )
      }
    </>
  )
}

export default Editor;
