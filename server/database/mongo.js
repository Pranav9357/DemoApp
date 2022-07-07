const mongoose = require('mongoose')
const { getMongoUri } = require('./mongoConstant')


const mongoConnector = () => {
    let db

    if(mongoose.connection.readyState === 1) {
        console.log('Mongo already connected.')
    } else {
        mongoose.connect(getMongoUri())
        db = mongoose.connection
        db.on('error' , err => {
            console.log('error' , err)
        })
        db.once('open' , () => {
            console.log('mongo connction successfully connected to' , getMongoUri())
        })
    }
    return db
}

module.exports = mongoConnector