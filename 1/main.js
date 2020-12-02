const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let expenses = [];

lineReader.on('line', function (line) {
    expenses.push(parseInt(line));
});

lineReader.on('close', () => {
    let expenseA = 0;
    let expenseB = 0;

    let found = false;
    let i = 0;
    

    do {
        let j = 1;
        do {
            if (expenses[i] + expenses[j] === 2020) {
                expenseA = expenses[i];
                expenseB = expenses[j];
                found = true;
            }
            j++;
        }
        while (!found && j < expenses.length);

        i++;
    }
    while (!found && i < expenses.length);
    
    console.log(expenseA * expenseB);
})

