// https://www.npmjs.com/
const validator = require('validator');
const chalk = require('chalk');

// VALIDATOR
// console.log(validator.isEmail('ai@mail.com'));
// console.log(validator.isMobilePhone('838888888', 'id-ID'));
// console.log(validator.isNumeric('838888888'));

// CHALK
// console.log(chalk.bgBlue.white.italic('Hello World'));
const pesan = chalk`
    There are {bold.red 5280 feet} in a mile.
	In {bold.blue miles}, there are {black.bold.bgWhite six} feet.
`;
console.log(pesan);