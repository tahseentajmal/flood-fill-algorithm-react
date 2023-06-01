import React, { useState } from "react";
import "./App.css";

const colors = [
  "#ff0000", // Red
  "#ff9900", // Orange
  "#ffff00", // Yellow
  "#00ff00", // Green
  "#00ffff", // Cyan
  "#4a86e8", // Light Blue
  "#0000ff", // Navy Blue
  "#9900ff", // Violet
  "#ff00ff", // Purple
  "#a64d79" // Magenta
];

function App() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [grid, setGrid] = useState(generateInitialGrid());

  function generateInitialGrid() {
    const initialGrid = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push(colors[Math.floor(Math.random() * colors.length)]);
      }
      initialGrid.push(row);
    }
    return initialGrid;
  }

  function handleColorClick(color) {
    setSelectedColor(color);
  }

  function handleCellClick(row, col) {
    const targetColor = grid[row][col];
    if (targetColor !== selectedColor) {
      const newGrid = floodFill([...grid], row, col, targetColor, selectedColor);
      setGrid(newGrid);
    }
  }

  function floodFill(grid, row, col, targetColor, newColor) {
    if (
      row < 0 ||
      row >= grid.length ||
      col < 0 ||
      col >= grid[row].length ||
      grid[row][col] !== targetColor ||
      grid[row][col] === newColor
    ) {
      return grid;
    }

    grid[row][col] = newColor;

    grid = floodFill(grid, row + 1, col, targetColor, newColor);
    grid = floodFill(grid, row - 1, col, targetColor, newColor);
    grid = floodFill(grid, row, col + 1, targetColor, newColor);
    grid = floodFill(grid, row, col - 1, targetColor, newColor);

    return grid;
  }

  return (
    <div className="App">
      <h1>ColorGrid</h1>
      <div id="color-selector">
        <h2>Select a Color.</h2>
        <div id="color-palette">
          {colors.map((color) => (
            <div
              key={color}
              className={`color-cell ${selectedColor === color ? "selected" : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorClick(color)}
            />
          ))}
        </div>
      </div>

      <table id="color-grid">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className="color-grid-cell"
                  style={{ backgroundColor: cell }}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
