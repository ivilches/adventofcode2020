let letters = [];
let grouped = [];

const processAnswer = (answer) => {
    if (answer !== '') {
        letters = [...letters, ...answer.split('')];
    }
    else {
        const uniques = new Set();
        letters.forEach(l => uniques.add(l));
        letters = [];
        grouped.push(uniques.size);
    }
}

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});


lineReader.on('line', (line) => processAnswer(line));

lineReader.on('close', () => {
    console.log(grouped.reduce((a, b) => a + b));
});