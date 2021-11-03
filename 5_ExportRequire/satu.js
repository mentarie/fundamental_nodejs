function cetakNama(nama) {
    return `Halo, nama saya ${nama}`;
}

const PI = 3.14;

module.exports.cetakNama = cetakNama; //function ini akan dikirimkan kepada file manapun yg require dia
module.exports.PI = PI;