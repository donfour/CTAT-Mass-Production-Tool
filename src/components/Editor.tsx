import React, {ChangeEvent, useMemo} from "react";
import {Brd} from "../types";
import TableRow from "./TableRow";

interface EditorProps {
  brd?: Brd;
  onBrdUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface Row {
  id: string;
  input?: string;
  selection?: string;
  buggyMessage?: string;
  hints?: string[];
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

  const rows: Row[] = useMemo(() => {
    return brd ? (
      brd.stateGraph.edge.map(edge => {
        const properties = edge.actionLabel.message.properties;
        const {buggyMessage, hintMessage} = edge.actionLabel || {};
        return {
          id: edge.actionLabel.uniqueID,
          input: properties.Input.value,
          selection: properties.Selection.value,
          buggyMessage,
          hints: typeof hintMessage === "string" ? [hintMessage] : hintMessage,
        };
      })
    ) : [];
  }, [brd]);

  return (
    <>
      {
        brd ? (
          <table>
            <thead>
            <tr>
              <th>Expand</th>
              <th>Type</th>
              <th>Imported Value</th>
            </tr>
            </thead>
            <tbody>
            {
              rows
                .filter(row => row.input !== "No_Value")
                .map(row =>
                  <TableRow
                    key={row.id}
                    data={row}
                    onMouseEnter={() => onMouseEnter(row.selection)}
                    onMouseLeave={() => onMouseLeave(row.selection)}
                  />
                )
            }
            </tbody>
          </table>
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
