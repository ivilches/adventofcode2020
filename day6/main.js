let groupAnswers = [];
let firstExerciseResult = 0;
let secondExerciseResult = 0;
let peopleInGroup = 0;

const processAnswer_First = (answer) => {
    if (answer !== '') {
        groupAnswers = [...groupAnswers, ...answer.split('')];
    }
    else {
        const uniques = new Set();
        groupAnswers.forEach(l => uniques.add(l));
        firstExerciseResult += uniques.size;

        groupAnswers = [];
    }
}

const processAnswer_Second = (answer) => {
    if (answer !== '') {
        groupAnswers = [...groupAnswers, ...answer.split('')];
        peopleInGroup += 1;
    }
    else {
        const counted = groupAnswers.reduce((acum,cur) => Object.assign(acum, { [cur]: (acum[cur] || 0) + 1 }), {});
        const answeredGroupally = groupAnswers.filter(l => (counted[l] >= peopleInGroup));
        const uniques = new Set();
        answeredGroupally.forEach(a => uniques.add(a));
        secondExerciseResult += uniques.size;

        groupAnswers = [];
        peopleInGroup = 0;
    }
}


const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});


lineReader.on('line', (line) => processAnswer_First(line));

lineReader.on('close', () => {
    console.log(`First exercise answer: ${firstExerciseResult}`);
    // console.log(`Second exercise answer ${secondExerciseAnswer}`);
});