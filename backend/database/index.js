const mongoose = require('mongoose')
const {DB} = require('../config')

const connectDB = () => {
    console.log(DB)
    const url = `${DB.DB_BASE_URL}/${DB.DB_NAME}`
    mongoose.connect(url)
    .then(() => {
        console.log(`Database is running`)
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = connectDB