const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/wpu', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    // useCreateIndex: true
});

// // Menambah 1 data
// const contact1 = new Contact({
//     nama:  'Aiiii',
//     nohp: '083462791891',
//     email: 'ai@mail.com'
// })

// // Simpan ke collection
// contact1
//     .save()
//     .then(contact => {
//         console.log(contact)
//     })