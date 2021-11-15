const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000

//Gunakan ejs
app.set('view engine', 'ejs')

// Third-party middleware
app.use(expressLayouts)

// Build in middleware
app.use(express.static('public'))

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
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Halaman Contact',
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use('/', (req, res) => { 
    res.status(404);
    res.send('404')
})