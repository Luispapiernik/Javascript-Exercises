function generateTable (width, height) {
    let table = new Array(height).fill(0);

    return table.map(() => new Array(width).fill(0));
}

class GameOfLife {
    constructor (width, height) {
        this.width = width;
        this.height = height;

        this.currentIndex = 0;
        this.tables = [
            generateTable(width, height),
            generateTable(width, height)
        ];
    }

    getTable () {
        return this.tables[this.currentIndex];
    }

    // when the user input data throught the interface
    updateCellState (row, column, cellState) {
        this.tables[this.currentIndex][row][column] = cellState;
    }

    countAliveNeighbors (row, column) {
        let aliveNeighbors = 0;

        // upper row of neighbors
        aliveNeighbors += this.tables[this.currentIndex][(row - 1) % this.height][(column - 1) % this.width]
        aliveNeighbors += this.tables[this.currentIndex][(row - 1) % this.height][column]
        aliveNeighbors += this.tables[this.currentIndex][(row - 1) % this.height][(column + 1) % this.width]

        // middle row of neirghbors
        aliveNeighbors += this.tables[this.currentIndex][row][(column - 1) % this.width]
        aliveNeighbors += this.tables[this.currentIndex][row][(column + 1) % this.width]

        // lower row of neighbors
        aliveNeighbors += this.tables[this.currentIndex][(row + 1) % this.height][(column - 1) % this.width]
        aliveNeighbors += this.tables[this.currentIndex][(row + 1) % this.height][column]
        aliveNeighbors += this.tables[this.currentIndex][(row + 1) % this.height][(column + 1) % this.width]

        return aliveNeighbors;
    }

    // this method apply the game of life rules
    update () {
        let newIndex = (this.currentIndex + 1) % 2;
        for (let i = 0; i < this.height; i++){
            for (let j = 0; j < this.width; j++) {
                let aliveNeighbors = this.countAliveNeighbors(i, j);

                if (this.tables[this.currentIndex][i][j] === 0 && aliveNeighbors === 3){
                    this.tables[newIndex][i][j] = 1;
                } else if (this.table[this.currentIndex][i][j] === 1 && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
                    this.tables[newIndex][i][j] = 1;
                } else {
                    this.tables[newIndex][i][j] = 0;
                }
            }
        }

        this.currentIndex = newIndex;
    }

    resize (newWidth, newHeight) {

    }
}
