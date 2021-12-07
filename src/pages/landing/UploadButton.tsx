import React, {ChangeEvent, useCallback, useRef} from 'react';
import uploadIcon from "../../assets/upload-icon.svg";

interface FileUploaderProps {
  replace?: boolean;
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UploadButton: React.FC<FileUploaderProps> = (props) => {
  const { onUpload, replace } = props;
  const hiddenFileInput = useRef(null);
  const handleClick = useCallback(() => {
    // @ts-ignore
    hiddenFileInput?.current?.click();
  }, []);

  return (
    <>
      {
        replace ? (
          <button onClick={handleClick} className="text-primary">Replace</button>
        ) : (
          <button onClick={handleClick} className="text-primary border rounded-sm border-gray-200 flex justify-center items-center gap-1 py-1.5 px-5">
            <img src={uploadIcon} alt="An upload icon"/>
            {props.children}
          </button>
        )
      }
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={onUpload}
        style={{display: "none"}}
      />
    </>
  );
}

export default UploadButton;
