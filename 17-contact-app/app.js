const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const {loadContact, detailContact, addContacts, cekDuplikat, deleteContact} = require('./utils/contacts')
const {body, validationResult, check} = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const app = express()
const port = 3000

//Gunakan ejs
app.set('view engine', 'ejs')

// Third-party middleware
app.use(expressLayouts)

// Build in middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

// konfigurasi flash
app.use(cookieParser('secret'))
app.use(session({
    cookie: {maxAge:6000},
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())


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
app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'Halaman About',
    })
})
app.get('/contact', (req, res) => {
    const contacts = loadContact()
    res.render('contact', {
        title: 'Halaman Contact',
        layout: 'layouts/main-layout',
        contacts,
        msg: req.flash('msg'),
    })
})

// halaman form tambah data contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Form Tambah Data Kontak',
        layout: 'layouts/main-layout',
    })
})

// proses data contact
app.post('/contact', [
    body('nama').custom((value) => {
        const duplikat = cekDuplikat(value)
        if (duplikat) {
            throw new Error('Nama contact sudah digunakan!')
        } return true
    }),
    check('email', 'Email tidak valid!').isEmail(),
    check('nohp', 'Nomor HP tidak valid!').isMobilePhone('id-ID'),
], 
(req,res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        // return res.status(400).json({ error: error.array() });
        res.render('add-contact', {
            title: 'Form Tambah Data Contact',
            layout: 'layouts/main-layout',
            error: error.array()
        })
    } else {
        // res.send(req.body)//buat lihat json yang terkirim
        addContacts(req.body)

        // kirimkan flash msg
        req.flash('msg', 'Data contact berhasil ditambahkan!')
        res.redirect('/contact')
    }
})


// halaman delete
app.get('/contact/delete/:nama', (req, res) => {
    const contact = detailContact(req.params.nama)
    // jika contact tidak ada
    if (!contact) {
        res.status(404)
        res.send('<h4>404</h4>')
    } else {
        deleteContact(req.params.nama)

        // kirimkan flash msg
        req.flash('msg', 'Data contact berhasil dihapus!')
        res.redirect('/contact')
    }
})

// form ubah data contact
app.get('/contact/:nama', (req, res) => {
    const contact = detailContact(req.params.nama)
    res.render('edit-contact', {
        title: 'Form Edit Data Kontak',
        layout: 'layouts/main-layout',
        contact,
    })
})

// halaman detail contact
app.get('/contact/:nama', (req, res) => {
    const contact = detailContact(req.params.nama)
    res.render('detail', {
        title: 'Halaman Detail Contact',
        layout: 'layouts/main-layout',
        contact,
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use('/', (req, res) => { 
    res.status(404);
    res.send('404')
})