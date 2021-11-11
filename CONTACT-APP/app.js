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
}).demandCommand(); //dikasih demand sebagai warning


yargs.command({ // menampilkan daftar kontak
    command: 'list',
    describe: 'Menampilkan semua nama & no HP di contact',
    handler(){
        contacts.listContact();
    }
});


yargs.command({ // menampilkan detail sebuah kontak
    command: 'detail',
    describe: 'Menampilkan detail sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.detailContact(argv.nama);
    }
});


yargs.command({ // menghapus sebuah kontak
    command: 'delete',
    describe: 'Menghapus sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.deleteContact(argv.nama);
    }
});

yargs.parse();