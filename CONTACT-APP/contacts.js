
const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

const dirPath = './data'; //cek ada direktori ini ga
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

const dataPath = './data/contacts.json'; //cek ada file ini ga di data
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8'); //bikin file, array kosong, string
}

const simpanContact = (nama,email,noHP) => {
    const contact = {
        nama,
        email,
        noHP
    };
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf8');
    const contacts = JSON.parse(fileBuffer);
    
    // cek duplikat nama
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if (duplikat) {
        console.log(
            chalk.red.inverse.bold('Contact sudah terdaftar, Gunakan nama lain!')
        );
        return false;
    }

    // cek email
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(
                chalk.red.inverse.bold('Email tidak valid')
            );
            return false;
        }
    }

    // cek no HP
    if (!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log(
            chalk.red.inverse.bold('Nomor HP tidak valid!')
        );
        return false;
    }

    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log(chalk.green.inverse.bold('Contact tersimpan'));
}

module.exports = {simpanContact};