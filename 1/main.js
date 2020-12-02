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
    let expenseC = 0;

    let found = false;
    let i = 0;

    do {
        let j = 1;
        do {
            let k = 2;
            do {
                if (expenses[i] + expenses[j] + expenses[k] === 2020) {
                    expenseA = expenses[i];
                    expenseB = expenses[j];
                    expenseC = expenses[k];
                    found = true;
                }
                
                k++;
            }
            while(!found && k < expenses.length);

            j++;
        }
        while (!found && j < expenses.length);

        i++;
    }
    while (!found && i < expenses.length);

    console.log(expenseA * expenseB * expenseC);
})