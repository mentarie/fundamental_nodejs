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

rl.question('Nama kamu? ', (nama) => {
     rl.question('Nomor telepon? ', (noHP) => {
         const contact = {
            nama,
            noHP
        };
        
        const file = fs.readFileSync('data/contacts.json', 'utf8');
        
        var contacts = JSON.parse(file);

        contacts.push(contact);

        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
        
        rl.close();
     })
});