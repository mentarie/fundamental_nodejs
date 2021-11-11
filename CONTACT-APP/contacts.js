
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dirPath = './data'; //cek ada direktori ini ga
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

const dataPath = './data/contacts.json'; //cek ada file ini ga di data
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8'); //bikin file, array kosong, string
}

const tulisPertanyaan = (pertanyaan) => { //buat promise untuk pakai async-await
    return new Promise((resolve, reject) => {
        rl.question(pertanyaan, (nama) => {
            resolve(nama);
        });
    })
}

const simpanContact = (nama,email,noHP) => {
    const contact = {
        nama,
        email,
        noHP
    };
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf8');
    var contacts = JSON.parse(fileBuffer);
    
    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log('terimakasih sudah memasukkan data.')
    rl.close();
}

module.exports = {tulisPertanyaan, simpanContact};