const express = require('express')
const expressLayouts =  require('express-ejs-layouts')

const app = express()
const port = 3000

app.listen(port, () => {
    console.log(`Mongo Contact App | listening at http://localhost:${port}`)
})

// default engine
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

// Halaman Home
app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'Mentari ER',
            email: 'mentari@mail.com'
        },
        {
            nama: 'Fadhlan H',
            email: 'fadhlan@mail.com'
        },
        {
            nama: 'Aii',
            email: 'ai@mail.com'
        }
    ]
    res.render('index', {
        layout: 'layouts/main-layout',
        title: 'Halaman Home',
        mahasiswa: mahasiswa
    })
})

// Halaman About
app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'Halaman About',
    })
})

// Halaman Contact
app.get('/contact', (req, res) => {
    const contacts = loadContact()
    res.render('contact', {
        title: 'Halaman Contact',
        layout: 'layouts/main-layout',
        contacts,
        msg: req.flash('msg'),
    })
})
