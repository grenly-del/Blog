require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })


const APPS = {
    PORT: process.env.PORT,
    HOST:process.env.HOST
}

const DB = {
    DB_BASE_URL: process.env.DB_BASE_URL,
    DB_NAME: process.env.DB_NAME
}

module.exports= {APPS, DB}