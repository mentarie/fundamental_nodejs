const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => { //"jika ada request ke halaman /"
    // res.json({ //kembalikan json
    //     nama: 'Ai',
    //     email: 'ai@mail.com',
    //     noHP: '0834526371'
    // })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use('/', (req, res) => { //use' akan menangkap semua perintah, maka jgn tulis use di paling atas (karena perintah di bawahnya ga tereksekusi)
    res.status(404);
    res.send('404')
})