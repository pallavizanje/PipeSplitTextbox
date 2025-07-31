import React, { useEffect, useState } from "react";

interface PipeSplitTextboxProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
}

const PipeSplitTextbox: React.FC<PipeSplitTextboxProps> = ({ name, value, onChange, onBlur }) => {
  const [hasPipe, setHasPipe] = useState(false);
  const [prefix, setPrefix] = useState("");
  const [editable, setEditable] = useState("");

  useEffect(() => {
    const pipeIndex = value.indexOf("|");
    if (pipeIndex !== -1) {
      setHasPipe(true);
      setPrefix(value.slice(0, pipeIndex));
      setEditable(value.slice(pipeIndex + 1));
    } else {
      setHasPipe(false);
      setPrefix("");
      setEditable(value);
    }
  }, [value]);

  const handleEditableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEditable = e.target.value;
    const newValue = hasPipe ? `${prefix}|${newEditable}` : newEditable;

    const syntheticEvent = {
      target: {
        name,
        value: newValue,
      },
    } as React.ChangeEvent<any>;

    onChange(syntheticEvent);
  };

  const handleEditableBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const syntheticEvent = {
      target: {
        name,
      },
    } as React.FocusEvent<any>;
    onBlur(syntheticEvent);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
      {hasPipe && (
        <span className="px-3 py-2 bg-gray-100 text-gray-600 text-sm">{prefix}</span>
      )}
      <input
        type="text"
        name={name}
        value={editable}
        onChange={handleEditableChange}
        onBlur={handleEditableBlur}
        className="flex-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default PipeSplitTextbox;
