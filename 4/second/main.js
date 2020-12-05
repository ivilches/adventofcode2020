const { parse } = require('path');

const passportFields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid'
];

function getValidPassports(passports) {
    let totalValidPassports = 0;

    passports.forEach(p => totalValidPassports += isValidPassport(p) ? 1 : 0);

    return totalValidPassports;
}

function isValidPassport(passport) {
    if (!passportFields.every(f => f in passport)) {
        return false;
    }

    if (!isBirthYearValid(passport.byr)) {
        return false;
    }

    if(!isIssueYearValid(passport.iyr)) {
        return false;
    }

    if(!isExpirationYearValid(passport.eyr)) {
        return false;
    }

    if(!isHeightValid(passport.hgt)) {
        return false;
    }

    if(!isHairColorValid(passport.hcl)) {
        return false;
    }

    if(!isEyeColorValid(passport.ecl)) {
        return false;
    }

    if(!isPassportIdValid(passport.pid)) {
        return false;
    }

    return true;
}

// byr (Birth Year) - four digits; at least 1920 and at most 2002.
const isBirthYearValid = (byr) => isAmountValid(1920, 2020, byr);

// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
const isIssueYearValid = (iyr) => isAmountValid(2010, 2020, iyr);

const isAmountValid = (min, max, amount) => parseInt(amount) >= min && parseInt(amount) <= max;

// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
const isExpirationYearValid = (eyr) => isAmountValid(2020, 2030, eyr);

// hgt (Height) - a number followed by either cm or in:
function isHeightValid(hgt) {
    if (/\d+cm\b/.test(hgt)) {
        // If cm, the number must be at least 150 and at most 193.
        const number = parseInt(hgt.match(/\d+/g)[0]);
        return number >= 150 && number <= 193;
    }
    else if (/\d+in\b/.test(hgt)) {
        // If in, the number must be at least 59 and at most 76.
        const number = parseInt(hgt.match(/\d+/g)[0]);
        return number >= 59 && number <= 76;
    }
    
    return false;
}

// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
const isHairColorValid = (hcl) => /#(\d|[a-f]){6}\b/g.test(hcl);

// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
const isEyeColorValid = (ecl) => /^(amb|blu|brn|gry|grn|hzl|oth){1}$/g.test(ecl);

// pid (Passport ID) - a nine-digit number, including leading zeroes.
const isPassportIdValid = (pid) => /\d{9}/g.test(pid);

// cid (Country ID) - ignored, missing or not.

let readedPassports = [];
let currentReadingPassport = {};

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('../input.txt')
});

lineReader.on('line', function (line) {
    if (line !== '') {
        const processed = line.split(' ');
        processed.forEach(p => {
            const [field, value] = p.split(':');
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