const bcrypt = require('bcrypt')
const { AddUser, CheckUserWithId } = require('./user.repository')
const jwt = require('jsonwebtoken')

const CreateUser = async (response) => {
    try {
        let newData = {}
        // Hash Password
        const hashPass = bcrypt.hashSync(response.password, 10)

        // Tambahkan ke database
        newData = {
            name: response.name,
            email: response.email,
            password: hashPass,
        }
        
        const user = await AddUser(newData)
        return user

    } catch (error) {
        throw error
    }
}


const CreateToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.SECRET_KEY, {
            expiresIn: '1d'
        })
        return token
    } catch (error) {
        throw error
    }
}

const CheckToken = (token) => {
    try {
        console.log(token)
        return jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) return {
                message: 'token tidak valid atau kadaluarsa',
                status: false
            }
            const CheckUser = await CheckUserWithId(decoded.userId)
            return CheckUser
            
        });
    } catch (error) {
        console.log(error)
        throw error 
    }
}


module.exports = {CreateUser, CreateToken, CheckToken}