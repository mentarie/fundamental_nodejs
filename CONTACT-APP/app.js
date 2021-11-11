const yargs = require('yargs');
const contacts = require('./contacts');

yargs.command({ //ketika perintah add dijalankan, maka kita akan mengisi:
    command: 'add', 
    describe: 'Menambahkan kontak baru', 
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string',
        },
        noHP: {
            describe: 'Nomor HP',
            demandOption: true,
            type: 'string',
        },
    }, 
    handler(argv){
        contacts.simpanContact(argv.nama,argv.email,argv.noHP);
    }
});

yargs.parse();