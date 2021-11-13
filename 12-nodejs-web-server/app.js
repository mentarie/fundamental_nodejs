const http = require('http')
const port = 3000;
const fs = require('fs')

// Buat function sebagai kerangka alamat
const renderHTML = (path, res) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write('Error: file not found')
        } else {
            res.write(data)
        }
        res.end();
    })
}

// Buat koneksi ke server, chaining perintah createServer dan listennya 
http
    .createServer((req, res) => {
        res.writeHead(200, {
            'Content-Type' : 'text/html'
        })

        const url = req.url;
        switch (url) {
            case './about':
                renderHTML('./about.html', res)
                break
            case './contact':
                renderHTML('./contact.html', res)
                break
            default:
                renderHTML('./index.html', res)
        }
    })
    .listen(port, () => { //kenapa 3000? cek port OS di wiki. port 3000 belum ada yg make dan udah jd standar
        console.log(`Server Listening on port ${port}`)
    })

