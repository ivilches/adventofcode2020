function getPolicy(rawPolicy) {
    return {
        positionA: parseInt(rawPolicy.split(' ')[0].split('-')[0]) - 1,
        positionB: parseInt(rawPolicy.split(' ')[0].split('-')[1]) - 1,
        character: rawPolicy.split(' ')[1]
    };
}

function isValidPassword(policy, password) {
    let coincidences = 0;
    
    if (password[policy.positionA] === policy.character) {
        coincidences++;
    }

    if (password[policy.positionB] === policy.character) {
        coincidences++;
    }

    return coincidences === 1;
}

function printTotalValidPasswords() {
    const totalValidPasswords = passwords.reduce((numberOfValid, p) => {
        const policy = getPolicy(p.split(':')[0]);
        const password = p.split(':')[1].trim();

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