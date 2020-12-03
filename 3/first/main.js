function countTrees() {
    // const inputMap = [
    //     '..##.........##.........##.........##.........##.........##.......',
    //     '#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..',
    //     '.#....#..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.',
    //     '..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#',
    //     '.#...##..#..#...##..#..#...##..#..#...##..#..#...##..#..#...##..#.',
    //     '..#.##.......#.##.......#.##.......#.##.......#.##.......#.##.....',
    //     '.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#',
    //     '.#........#.#........#.#........#.#........#.#........#.#........#',
    //     '#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...',
    //     '#...##....##...##....##...##....##...##....##...##....##...##....#',
    //     '.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#'
    // ];
    // console.log(map);
    const tree = '#';
    let treesFound = 0;

    let rowIndex = 0;
    let columnIndex = 0;

    do {
        // move 3 right
        columnIndex += 3;
        // move 1 down
        rowIndex +=1;

        let currentRow = inputMap[rowIndex];
        do {
            currentRow += currentRow;
        }
        while(currentRow[columnIndex] === undefined);

        treesFound += currentRow[columnIndex] === tree ? 1 : 0;
    }
    while(rowIndex < inputMap.length - 1);

    console.log(treesFound);
}


let inputMap = [];
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

lineReader.on('line', function (line) {
    inputMap.push(line);
});

lineReader.on('close', countTrees)