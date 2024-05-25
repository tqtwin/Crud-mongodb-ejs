const mongoose = require('mongoose');

const connectMongoDB = () => {
    const URI = "mongodb://localhost:27017/Students"
    mongoose.connect(URI).then(() => {
        console.log('Connected to MongoDB')
    }).catch((error) => {
        console.log('Error connecting to MongoDB', error)
    })
}

module.exports = connectMongoDB;
