// const fs = require('fs'); //core module
// const cetakNama = require('./satu'); //ambil file js lain //local module (buatan sendiri) karena ada "./" = relative url
// const moment = require('moment'); //third party / npm module / node modules

const satu = require('./satu'); //ambil langsung dari satu.js
console.log(satu); //raw
console.log(satu.cetakNama('ai'), satu.PI); //ambil objectnya


