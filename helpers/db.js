const mongoose = require('mongoose')

module.exports = () => {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true });

    mongoose.connection.on('open', () => {
        console.log('connected MongoDB')
    });

    mongoose.connection.on('error', err => {
        console.log(err)
    });
}