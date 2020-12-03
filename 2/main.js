function getPolicy(rawPolicy) {
    return {
        minLimit: rawPolicy.split(' ')[0].split('-')[0],
        maxLimit: rawPolicy.split(' ')[0].split('-')[1],
        character: rawPolicy.split(' ')[1]
    };
}

function isValidPassword(policy, password) {
    const occurrences = password.split('').reduce((frequency, letter) => {
        frequency += letter === policy.character ? 1 : 0;
        return frequency;
    }, 0);

    return occurrences >= policy.minLimit && occurrences <= policy.maxLimit;
}

function printTotalValidPasswords() {
    const totalValidPasswords = passwords.reduce((numberOfValid, p) => {
        const policy = getPolicy(p.split(':')[0]);
        const password = p.split(':')[1];

        numberOfValid += isValidPassword(policy, password) ? 1 : 0;
        return numberOfValid;
    }, 0);

    console.log(totalValidPasswords);
}

let passwords = [];
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

lineReader.on('line', function (line) {
    passwords.push(line);
});

lineReader.on('close', printTotalValidPasswords)



