let seats = [];

const getRow = (boardingPass) => {
    const rowChars = boardingPass.slice(0,7);
    let currentRange = { start: 0, end: 127 };
    
    return getDataThroughHalves(rowChars, 'F', currentRange);
}

const getColumn = (boardingPass) => {
    const columnChars = boardingPass.slice(7);
    let currentRange = { start: 0, end: 7 }

    return getDataThroughHalves(columnChars, 'L', currentRange);
}

const getDataThroughHalves = (characters, topCharacter, wholeRange) => {
    let currentRange = wholeRange;
    for(let i in characters) {        
        const middle = ((currentRange.end - currentRange.start) + 1) / 2;
    
        const firstHalf = { start: (currentRange.start + 0), end: (currentRange.start + middle - 1) };
        const secondHalf = { start: (currentRange.start + middle), end: currentRange.end };

        currentRange = (characters[i] === topCharacter) ? firstHalf : secondHalf;
    }

    return currentRange.start;
}

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('../input.txt')
});

lineReader.on('line', function (line) {
    const row = getRow(line);
    const column = getColumn(line);
    seats.push({
        row,
        column,
        id: (row * 8) + column,
    });
});

lineReader.on('close', () => {
    const highest = seats.sort((a, b) => b.id - a.id)[0];
    console.log(`HIGHEST ID ${highest.id}`);

    const ordered = seats.sort((a, b) => a.id - b.id);

    for (let seat = 0; seat < ordered.length; seat++) {
        if (ordered[seat+1] !== undefined) {  
            const expectedNext = ordered[seat].id + 1;
            const effectiveNext = ordered[seat+1].id;

            if (expectedNext !== effectiveNext) {
                console.log(`MINE! ${expectedNext}`);
            }
        }
    }
});