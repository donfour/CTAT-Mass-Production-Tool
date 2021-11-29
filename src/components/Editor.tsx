import React, {ChangeEvent} from "react";
import {Brd} from "../types";

interface EditorProps {
  brd?: Brd;
  onBrdUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

function onMouseEnter (id?: string) {
  if(id){
    const iframe = document.getElementById("tutor");
    // @ts-ignore
    iframe?.contentWindow?.document?.getElementById(id)?.classList?.add('active');
  }
}

function onMouseLeave (id?: string) {
  if(id){
    const iframe = document.getElementById("tutor");
    // @ts-ignore
    iframe?.contentWindow?.document?.getElementById(id)?.classList?.remove('active');
  }
}

function Editor (props: EditorProps) {
  const { brd, onBrdUpload } = props;
  return (
    <>
      {
        brd ? (
          <table>
            <thead>
            <tr>
              <th>uniqueID</th>
              <th>Selection</th>
              <th>Action</th>
              <th>Input</th>
              <th>buggyMessage</th>
              <th>hintMessage</th>
              <th>successMessage</th>
            </tr>
            </thead>
            <tbody>
            {
              brd?.stateGraph?.edge?.map(edge => {
                const properties = edge?.actionLabel?.message?.properties;
                const uniqueID = edge?.actionLabel?.uniqueID;
                const {buggyMessage, hintMessage, successMessage} = edge?.actionLabel || {};
                return (
                  <tr
                    key={uniqueID}
                    onMouseEnter={() => onMouseEnter(properties?.Selection?.value)}
                    onMouseLeave={() => onMouseLeave(properties?.Selection?.value)}
                  >
                    <td>{uniqueID}</td>
                    <td>{properties?.Selection?.value}</td>
                    <td>{properties?.Action?.value}</td>
                    <td>{properties?.Input?.value}</td>
                    <td>{buggyMessage}</td>
                    <td>{hintMessage}</td>
                    <td>{successMessage}</td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        ) : (
          <>
            <input type="file" name="file" onChange={onBrdUpload} />
            <p>Please select a brd file</p>
          </>
        )
      }
    </>
  )
}

export default Editor;
