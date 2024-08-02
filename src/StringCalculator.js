import React, { useState } from "react";

const StringCalculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const calculateSum = (numbers) => {
    if (!numbers) return 0;

    // Default delimiter is a comma, with newline as an additional delimiter
    let delimiter = /,|\n/;

    // Check for a custom delimiter at the start of the string
    if (numbers.startsWith("//")) {
      const delimiterMatch = numbers.match(/^\/\/(.+)\n/);
      if (delimiterMatch) {
        delimiter = new RegExp(delimiterMatch[1]);
        numbers = numbers.slice(delimiterMatch[0].length);
      }
    }

    // Split the numbers by the delimiter and parse them as integers
    const numberArray = numbers.split(delimiter).map(Number);

    // Return the sum, ignoring any invalid numbers
    return numberArray.reduce((sum, num) => (isNaN(num) ? sum : sum + num), 0);
  };

  const handleCalculate = () => {
    const sum = calculateSum(input);
    setResult(sum);
  };

  return (
    <div>
      <h1>String Calculator</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter numbers"
      />
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && <p>Sum: {result}</p>}
    </div>
  );
};

export default StringCalculator;
