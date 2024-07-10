const mongoose = require('mongoose');

const connectToMongoDB = () => {
    mongoose.connect(`${process.env.MONGODB_URI}`)
        .then(() => console.log('Database is ok.'))
        .catch(err => console.log(err)); 
}

module.exports = connectToMongoDB