import React, {ChangeEvent, useCallback, useMemo, useState} from "react";
import {Brd} from "../../types";
import TableRow from "./TableRow";
import X2JS from 'x2js';
import {saveAs} from 'file-saver';
import JSZip from "jszip";

const zip = new JSZip();
const x2js = new X2JS({selfClosingElements: false});

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

  const [questions, setQuestions] = useState<Cell[][]>([]);

  const initialRows: Row[] = useMemo(() => {
    return brd ? (
      brd.stateGraph.edge
        .filter(edge => edge.actionLabel.message.properties.Input.value !== "No_Value")
        // currently no support for formulas (i.e. ExpressionMatcher)
        .filter(edge => edge.actionLabel.matchers.Input.matcher.matcherType === "ExactMatcher")
        .map(edge => {
          const matchers = edge.actionLabel.matchers;
          const {buggyMessage, hintMessage} = edge.actionLabel || {};

          return {
            id: edge.actionLabel.uniqueID,
            selection: matchers.Selection.matcher.matcherParameter.__text,
            cells: [{
              input: matchers.Input.matcher.matcherParameter.__text,
              buggyMessage,
              hints: typeof hintMessage === "string" ? [hintMessage] : !hintMessage ? [] : hintMessage,
            }]
          };
        })
    ) : [];
  }, [brd]);

  const rows: Row[] = initialRows.map((initialRow, index) => {
    return {
      ...initialRow,
      cells: [...initialRow.cells, ...(questions || []).map(question => question[index])], // TODO: get rid of question?
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
      newQuestions[questionIndex - 1][rowIndex] = newCell;
      return newQuestions;
    });
  }, []);

  const generateBrdForQuestion = useCallback((questionIndex: number): Brd => {
    const document: Brd = JSON.parse(JSON.stringify(brd));
    rows.forEach(row => {
      const uniqueID = row.id;
      const cell = row.cells[questionIndex];
      const edge = document.stateGraph.edge.find((edge) => edge.actionLabel.uniqueID === uniqueID);

      if (!edge) return;

      //@ts-ignore
      edge.actionLabel.message.properties.Input.value = cell.input;
      //@ts-ignore
      edge.actionLabel.matchers.Input.matcher.matcherParameter.__text = cell.input;
      //@ts-ignore
      edge.actionLabel.buggyMessage = cell.buggyMessage;
      //@ts-ignore
      edge.actionLabel.hintMessage = cell.hints;
    })
    return document;
  }, [brd, rows])

  const onExportBrds = useCallback(() => {
    for (let questionIndex = 1; questionIndex < rows[0].cells.length; questionIndex++) {
      const brd = generateBrdForQuestion(questionIndex);
      const xml = x2js.js2xml(brd);
      zip.file(`problem${questionIndex + 1}.brd`, xml);
    }

    zip.generateAsync({type: "blob"}).then(function (content) {
      saveAs(content, "example.zip");
    });
  }, [rows, generateBrdForQuestion]);

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
            <button onClick={onExportBrds}>Export</button>
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
