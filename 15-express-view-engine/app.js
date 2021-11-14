const { render } = require('ejs')
const express = require('express')
const app = express()
const port = 3000

//gunakan ejs
app.set('view engine', 'ejs')

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
    res.render('index', {mahasiswa: mahasiswa})
})
app.get('/about', (req, res) => {res.render('about')})
app.get('/contact', (req, res) => {res.render('contact')})
app.get('/product/:id', (req,res) => {res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`)})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use('/', (req, res) => { 
    res.status(404);
    res.send('404')
})