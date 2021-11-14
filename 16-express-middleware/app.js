const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const app = express()
const port = 3000

//Gunakan ejs
app.set('view engine', 'ejs')

// Third-party middleware
app.use(expressLayouts)
app.use(morgan('dev')) //nulis log di console

// Build in middleware
app.use(express.static('public'))

// Application level middleware
app.use((req,res,next) => {
    console.log('Time: ', Date.now())
    next()
})

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
app.get('/product/:id', (req,res) => {res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`)})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use('/', (req, res) => { 
    res.status(404);
    res.send('404')
})