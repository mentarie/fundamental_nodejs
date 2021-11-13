const http = require('http')
const port = 3000;
const fs = require('fs')

// Buat koneksi ke server, chaining perintah createServer dan listennya 
http
    .createServer((req, res) => {
        res.writeHead(200, {
            'Content-Type' : 'text/html'
        })

        const url = req.url;
        if (url === '/about') {
            fs.readFile('./about.html', (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.write('Error: file not found')
                } else {
                    res.write(data)
                }
                res.end();
            })
        } else if(url === '/contact'){
            fs.readFile('./contact.html', (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.write('Error: file not found')
                } else {
                    res.write(data)
                }
                res.end();
            })
        } else {
            fs.readFile('./index.html', (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.write('Error: file not found')
                } else {
                    res.write(data)
                }
                res.end();
            })
        }
    })
    .listen(port, () => { //kenapa 3000? cek port OS di wiki. port 3000 belum ada yg make dan udah jd standar
        console.log(`Server Listening on port ${port}`)
    })

