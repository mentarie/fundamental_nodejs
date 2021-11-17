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

const saveContact = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
    console.log('Contact tersimpan')
}

const addContacts = (contact) => {
    const contacts = loadContact()
    contacts.push(contact)
    saveContact(contacts)
}

const cekDuplikat = (nama) => {
    const contacts = loadContact()
    return contacts.find((contact) => contact.nama === nama)
}

const deleteContact = (nama) => {
    const contacts = loadContact()
    const newContacts = contacts.filter((contact) => contact.nama !== nama)
    // if (contacts.length === newContacts) {
    //     console.log('Nama tidak ditemukan')
    // } return false

    saveContact(newContacts)
}

module.exports = {loadContact, detailContact, addContacts, cekDuplikat, deleteContact}