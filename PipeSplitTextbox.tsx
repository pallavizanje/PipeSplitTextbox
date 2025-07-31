import React, { useState, useEffect } from "react";

interface PipeSplitTextboxProps {
  value: string;
  onChange: (newValue: string) => void;
}

const PipeSplitTextbox: React.FC<PipeSplitTextboxProps> = ({ value, onChange }) => {
  const [hasPipe, setHasPipe] = useState(false);
  const [prefix, setPrefix] = useState("");
  const [editable, setEditable] = useState("");

  useEffect(() => {
    const pipeIndex = value.indexOf("|");

    if (pipeIndex !== -1) {
      const beforePipe = value.slice(0, pipeIndex);
      const afterPipe = value.slice(pipeIndex + 1);
      setHasPipe(true);
      setPrefix(beforePipe);
      setEditable(afterPipe);
    } else {
      setHasPipe(false);
      setEditable(value);
      setPrefix("");
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEditable = e.target.value;

    if (hasPipe) {
      setEditable(newEditable);
      onChange(`${prefix}|${newEditable}`);
    } else {
      setEditable(newEditable);
      onChange(newEditable);
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
      {hasPipe && (
        <span className="px-3 py-2 bg-gray-100 text-gray-600 text-sm">{prefix}</span>
      )}
      <input
        type="text"
        value={editable}
        onChange={handleChange}
        className="flex-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default PipeSplitTextbox;
