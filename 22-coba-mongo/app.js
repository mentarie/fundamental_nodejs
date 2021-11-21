const { MongoClient} = require('mongodb')

const uri = 'mongodb://127.0.0.1:27017'
const dbName = 'wpu';

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

client.connect((error, client) => {
    if (error) {
        return console.log('Koneksi gagal!')
    }
    console.log('Koneksi Berhasil!')
    
    // pilih database
    const db = client.db(dbName)
    
    // menambahkan 1 data ke collection mahasiswa
    // db.collection('mahasiswa').insertOne(
    //     {
    //         name: 'Lalisa',
    //         email: 'lalisa@mail.com'
    //     },
    //     (error,result) => {
    //         if (error) {
    //             return console.log('Gagal menambahkan data!')
    //         }
    //         console.log(result)
    //     }
    // )

    // menambahkan lebih dari 1 data
    db.collection('mahasiswa').insertMany([
        {
            name: 'Mentari',
            email: 'mentari@mail.com'
        },
        {
            name: 'Fadhlan',
            email: 'fadhlan@mail.com'
        },
        (error, result) => {
            if (error) {
                return console.log('Gagal menambahkan data banyak!')
            }
            console.log(result)
        }
    ])
})

