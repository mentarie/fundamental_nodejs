const express = require('express')
const expressLayouts =  require('express-ejs-layouts')

const {body, validationResult, check} = require('express-validator')
const methodOverride = require('method-override')

const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

require('./utils/db')
const Contact = require('./model/contact')

const app = express()
const port = 3000

// setup method-override
app.use(methodOverride('_method'))

app.listen(port, () => {
    console.log(`Mongo Contact App | listening at http://localhost:${port}`)
})

// default engine (EJS)
app.set('view engine', 'ejs')
app.use(expressLayouts)
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
app.get('/contact', async (req, res) => {
    const contacts = await Contact.find()
    res.render('contact', {
        title: 'Halaman Contact',
        layout: 'layouts/main-layout',
        contacts,
        msg: req.flash('msg'),
    })
    console.log(contacts)
})

// Halaman form tambah data contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Form Tambah Data Kontak',
        layout: 'layouts/main-layout',
    })
})

// Proses data contact
app.post('/contact', 
    [
        body('nama').custom(async (value) => {
            const duplikat = await Contact.findOne({nama: value})
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
            Contact.insertMany(req.body, (error, result) => {
                // kirimkan flash msg
                req.flash('msg', 'Data contact berhasil ditambahkan!')
                res.redirect('/contact')
            })
        }
    }
)

// form ubah data contact
app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({nama: req.params.nama})
    res.render('edit-contact', {
        title: 'Form Edit Data Kontak',
        layout: 'layouts/main-layout',
        contact,
    })
})

// Proses ubah data
app.put('/contact', [
    body('nama').custom(async (value, {req}) => { //req disini biar body. nama kita bisa akses request juga 
        const duplikat = await Contact.findOne({nama: value})
        if (value !== req.body.oldNama && duplikat) {
            throw new Error('Nama contact sudah digunakan!')
        } return true
    }),
    check('email', 'Email tidak valid!').isEmail(),
    check('nohp', 'Nomor HP tidak valid!').isMobilePhone('id-ID'),
], 
(req,res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        res.render('edit-contact', {
            title: 'Form Edit Data Contact',
            layout: 'layouts/main-layout',
            error: error.array(),
            contact: req.body
        })
    } else {
        Contact.updateOne(
            { _id: req.body._id },
            {
                $set: {
                    nama:req.body.nama,
                    email:req.body.email,
                    nohp: req.body.nohp
                }
            }
        ).then(result => {
            // kirimkan flash msg
            req.flash('msg', 'Data contact berhasil diubah!')
            res.redirect('/contact')
        })
    }
})

// halaman delete
app.delete('/contact/', (req, res) => {
    Contact.deleteOne({nama: req.body.nama}).then( (result) => {
        // kirimkan flash msg
        req.flash('msg', 'Data contact berhasil dihapus!')
        res.redirect('/contact')
    })
})

// Halaman detail contact
app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({nama: req.params.nama})
    res.render('detail', {
        title: 'Halaman Detail Contact',
        layout: 'layouts/main-layout',
        contact,
    })
})
