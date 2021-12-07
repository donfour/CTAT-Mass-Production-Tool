import React, {useCallback, useEffect, useState} from "react";

interface EditableCellProps {
  value?: string;
  onFinishEdit: (newValue?: string) => void;
}

function EditableCell(props: EditableCellProps) {
  const {value: initialValue, onFinishEdit} = props;

  const [value, setValue] = useState(initialValue);
  useEffect(() => setValue(initialValue), [initialValue]);

  const onChange = useCallback(e => setValue(e.target.value), []);
  const onBlur = useCallback(() => onFinishEdit(value), [value, onFinishEdit]);

  return <input value={value} onChange={onChange} onBlur={onBlur}/>;
}

export default EditableCell;
