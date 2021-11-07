//CORE MODULE
//File system
const fs = require('fs');

// Menuliskan string ke file (synchronous)
fs.writeFileSync('test.txt', 'Hello World secara synchronous');