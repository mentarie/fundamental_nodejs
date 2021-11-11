const yargs = require('yargs');

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
        const contact = {
            nama: argv.nama,
            email: argv.email,
            noHP: argv.noHP
        };
        console.log(contact);
    }
});

yargs.parse();