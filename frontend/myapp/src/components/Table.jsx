import React, { useState, useEffect } from "react";

export function Table() {
  const [numericalData, setNumericalData] = useState([]);
  const [percentages, setPercentages] = useState([]);

  const handleAnswerChange = (index, inputValue) => {
    if (inputValue === ''){
      inputValue= '0'
    }
    const num = numericalData[index];
    const numericInputValue = parseFloat(inputValue);

    if (!isNaN(numericInputValue)) {
      const newPercentages = [...percentages];
      newPercentages[index] = (numericInputValue / num) * 100;
      setPercentages(newPercentages);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/get_values");
        const result = await response.json();
        setNumericalData(result.nums);
        setPercentages(Array(result.nums.length).fill(0));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {}, [numericalData, percentages]);

  return (
    <div style={{display: 'flex', justifyContent: "center", marginTop: '100px'}}>
      <form>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Input</th>
              <th style={thTdStyle}>Numerical Values</th>
              <th style={thTdStyle}>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {numericalData.map((num, index) => (
              <tr key={num}>
                <td style={thTdStyle}>
                  <input
                    className="form-control"
                    placeholder="Enter Number"
                    type="number"
                    onInput={(e) => handleAnswerChange(index, e.target.value)}
                  />
                </td>
                <td style={thTdStyle}>{num}</td>
                <td style={thTdStyle}>{percentages[index]} %</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}

const tableStyle = {
  borderCollapse: "collapse",
  width: "800px",
  margin: "20px",
};
const thTdStyle = {
  border: "1px solid #dddddd",
  maxWidth: "200px",
  textAlign: "center",
  paddingTop: "10px",
  paddingBottom: "10px",
  marginRight: "10px",
};
