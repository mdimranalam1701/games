 const SIZE = 9;
        let grid = document.getElementById("sudoku-grid");

        // Predefined Sudoku puzzle (50% filled)
        const puzzle = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ];
          //create sudoku grid with pre -filled values
        function createGrid() {
            for (let i = 0; i < SIZE; i++) {
                for (let j = 0; j < SIZE; j++) {
                    let input = document.createElement("input");
                    input.type = "text";
                    input.maxLength = 1;
                    input.classList.add("cell");

                    if (puzzle[i][j] !== 0) {
                        input.value = puzzle[i][j];
                        input.classList.add("pre-filled");
                    } else {
                        input.addEventListener("input", function () {
                            this.value = this.value.replace(/[^1-9]/g, "");
                        });
                    }

                    grid.appendChild(input);
                }
            }
        }

        // Get grid values as a 2D array
        function getGridValues() {
            let values = [];
            let cells = document.querySelectorAll(".cell");
            for (let i = 0; i < SIZE; i++) {
                values.push([]);
                for (let j = 0; j < SIZE; j++) {
                    let val = cells[i * SIZE + j].value;
                    values[i].push(val ? parseInt(val) : 0);
                }
            }
            return values;
        }
 // Set grid values from a 2D array
        function setGridValues(values) {
            let cells = document.querySelectorAll(".cell");
            for (let i = 0; i < SIZE; i++) {
                for (let j = 0; j < SIZE; j++) {
                    if (!cells[i * SIZE + j].classList.contains("pre-filled")) {
                        cells[i * SIZE + j].value = values[i][j] || "";
                    }
                }
            }
        }

        // Check if a number can be placed in a position
        function isValid(board, row, col, num) {
            for (let i = 0; i < SIZE; i++) {
                if (board[row][i] === num || board[i][col] === num) {
                    return false;
                }
            }

            let startRow = Math.floor(row / 3) * 3;
            let startCol = Math.floor(col / 3) * 3;

            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[startRow + i][startCol + j] === num) {
                        return false;
                    }
                }
            }

            return true;
        }

        // Solve Sudoku using backtracking
        function solve(board) {
            for (let row = 0; row < SIZE; row++) {
                for (let col = 0; col < SIZE; col++) {
                    if (board[row][col] === 0) {
                        for (let num = 1; num <= SIZE; num++) {
                            if (isValid(board, row, col, num)) {
                                board[row][col] = num;
                                if (solve(board)) return true;
                                board[row][col] = 0;
                            }
                        }
                        return  false;
                    }
                }
            }
            return true;
        }

        // Solve Sudoku on button click
        function solveSudoku() {
            let board = getGridValues();
            if (solve(board)) {
                setGridValues(board);
            } else {
                alert("No solution found! Please check your input.");
            }
        }

        // Clear the grid (except pre-filled cells)
        function clearGrid() {
            document.querySelectorAll(".cell").forEach(cell => {
                if (!cell.classList.contains("pre-filled")) {
                    cell.value = "";
                }
            });
        }

        // Initialize grid with 50% pre-filled
        createGrid();