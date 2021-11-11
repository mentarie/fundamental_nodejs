
const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

const dirPath = './data'; //cek ada direktori ini ga
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
};

const dataPath = './data/contacts.json'; //cek ada file ini ga di data
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8'); //bikin file, array kosong, string
};

const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
};

const simpanContact = (nama,email,noHP) => {
    const contact = {
        nama,
        email,
        noHP
    };
    const contacts = loadContact();
    
    // cek duplikat nama
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if (duplikat) {
        console.log(
            chalk.red.inverse.bold('Contact sudah terdaftar, Gunakan nama lain!')
        );
        return false;
    };

    // cek email
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(
                chalk.red.inverse.bold('Email tidak valid')
            );
            return false;
        };
    };

    // cek no HP
    if (!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log(
            chalk.red.inverse.bold('Nomor HP tidak valid!')
        );
        return false;
    };

    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log(chalk.green.inverse.bold('Contact tersimpan'));
};


const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.green.inverse.bold('Daftar Kontak:'));
    contacts.forEach((contact,i) => {
        console.log(`${i+1}. ${contact.nama} - ${contact.noHP}`);
    });
};


const detailContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    if (!contact) {
        console.log(
            chalk.red.inverse.bold(`Nama ${nama} tidak ditemukan!`)
        );
        return false;
    };

    console.log(chalk.cyan.inverse.bold(contact.nama));
    console.log(contact.noHP);
    if (contact.email) {
        console.log(contact.email);
    }
};


const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());
    if (contacts.length === newContacts.length) {
        console.log(
            chalk.red.inverse.bold(`Nama ${nama} tidak ditemukan!`)
        );
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
    console.log(chalk.green.inverse.bold(`Contact ${nama} berhasil dihapus`));
};


module.exports = {simpanContact, listContact, detailContact, deleteContact};