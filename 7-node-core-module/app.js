//CORE MODULE
//File system
const fs = require('fs');


// Menuliskan string ke file (synchronous) -------------------------------------------------------------------
// tampung errornya pakai try catch klo synchronous
// try {
//     fs.writeFileSync('test.txt', 'Hello World secara synchronous');
// } catch (error) {
//     console.log(error);
// }

// Menuliskan string ke file (asynchronous)
// tampung errornya pakai callback klo asynchronous
// fs.writeFile('test.txt', 'Hello World secara Asynchronous', (error) => {
//     console.log(error);
// });



// Membaca isi file (synchronous) ----------------------------------------------------------------------------
// const data = fs.readFileSync('test.txt', 'utf-8'); //buffer diubah jadi huruf latin dengan utf-8
// console.log(data); //hanya keluar buffernya klo belum utf-8

// // Membaca isi file (asynchronous)
// const data = fs.readFileSync('test.txt', (error, data) => {
//     if (error) throw error;
//     console.log(data);
// });



// Readline --> modul untuk membaca apa yg kita tulskan/input ------------------------------------------------
const readline = require('readline');
// Buat interface I/O
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Buat pertanyaannya
rl.question('Nama kamu? ', (nama) => {
     rl.question('Nomor telepon? ', (noHP) => {
         console.log(`Ternyata namanya ${nama} dan nomor teleponnya ${noHP}.`);

        //  masukkan dalam object
        const contact = {
            nama,
            noHP
        }
        // simpan ke file sementara (buffer) dan cek isi file contact.json dulu karena dia masih string
        const file = fs.readFileSync('data/contacts.json', 'utf8');
        
        // kita parse object kita jadi json
        var contacts = JSON.parse(file);

        // kita push data kita
        contacts.push(contact);

        // sedangkan untuk favorit.json, filenya kita tulis sebagai string
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
        
         rl.close();
     })
});