function countTrees(movementsRight, movementsDown) {
    const tree = '#';
    let treesFound = 0;

    let rowIndex = 0;
    let columnIndex = 0;

    do {
        columnIndex += movementsRight;
        rowIndex += movementsDown;

        let currentRow = inputMap[rowIndex];
        do {
            currentRow += currentRow;
        }
        while(currentRow[columnIndex] === undefined);

        treesFound += currentRow[columnIndex] === tree ? 1 : 0;
    }
    while(rowIndex < inputMap.length - 1);

    console.log(treesFound);
    return treesFound;
}


let inputMap = [];
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

lineReader.on('line', function (line) {
    inputMap.push(line);
});

lineReader.on('close', () => {
    const firstSlope = countTrees(1, 1);
    const secondSlope = countTrees(3, 1);
    const thirdSlope = countTrees(5, 1);
    const fourthSlope = countTrees(7, 1);
    const fifthSlope = countTrees(1, 2);

    const result = firstSlope * secondSlope * thirdSlope * fourthSlope * fifthSlope;

    console.log(result);
});