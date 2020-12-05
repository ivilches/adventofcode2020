const passportFields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
    'cid'
];

const northPoleFields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid'
]

function getValidPassports(passports) {
    let totalValidPassports = 0;

    passports.forEach(p => {
        if (isNorthPoleCredentials(p)) {
            totalValidPassports += 1;
        }
        else {
            totalValidPassports += isValidPassport(p) ? 1 : 0;
        }
    });

    return totalValidPassports;
}

function isValidPassport(passport) {
    return passportFields.every(f => f in passport);
}

function isNorthPoleCredentials(passport) {
    return !('cid' in passport) && northPoleFields.every(f => f in passport);
}

let readedPassports = [];
let currentReadingPassport = {};

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('../input.txt')
});

lineReader.on('line', function (line) {
    if (line !== '') {
        const processed = line.split(' ');
        processed.forEach(p => {
            const field = p.split(':')[0];
            const value = p.split(':')[1];
            currentReadingPassport[field] = value;
        })
    } else {
        readedPassports.push(currentReadingPassport);
        currentReadingPassport = {};
    }
});

lineReader.on('close', () => {
    const totalValidPassports = getValidPassports(readedPassports);
    console.log('totalValidPassports', totalValidPassports);
});