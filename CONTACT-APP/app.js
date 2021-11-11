const {tulisPertanyaan, simpanContact} = require('./contacts.js');

const main = async () => { //menangkap jawaban dan mengirimkan ke json
    const nama = await tulisPertanyaan('Nama Anda? ');
    const email = await tulisPertanyaan('Alamat Email? ');
    const noHP = await tulisPertanyaan('No HP? ');

    simpanContact(nama,email,noHP);
}

main();