function cetakNama(nama) {
    return `Halo, nama saya ${nama}`;
}

const PI = 3.14;

const mahasiswa = {
    nama: 'Doddy Ferdiansyah',
    umur: 20,
    cetakMhs(){
        return `Haloo nama saya ${this.nama}. Saya berusia ${this.umur}.`;
    }
}

class Orang{
    constructor(){
        console.log('Objek orang telah dibuat');
    }
}

module.exports.cetakNama = cetakNama; //function ini akan dikirimkan kepada file manapun yg require dia
module.exports.PI = PI;
module.exports.mahasiswa = mahasiswa;