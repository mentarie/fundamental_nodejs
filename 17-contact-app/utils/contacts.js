const fs = require('fs')

const dirPath = './data'
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
};

const dataPath = './data/contacts.json'
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8')
};

const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf8')
    const contacts = JSON.parse(fileBuffer)
    return contacts
};

const detailContact = (nama) => {
    const contacts = loadContact()
    const contact = contacts.find((contact) => contact.nama === nama)
    return contact
};

module.exports = {loadContact, detailContact}