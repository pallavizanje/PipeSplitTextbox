import React, { useState } from "react";
import PipeSplitTextbox from "./PipeSplitTextbox";

const ExampleUsage = () => {
  const [textValue, setTextValue] = useState("TESTING|Pallavi");
  // Try also: useState("OnlyEditable")

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <PipeSplitTextbox
        value={textValue}
        onChange={(updatedValue) => setTextValue(updatedValue)}
      />

      <div className="text-sm text-gray-600">
        Final Value: <span className="font-mono">{textValue}</span>
      </div>
    </div>
  );
};

export default ExampleUsage;
