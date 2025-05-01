const Users = require('./user.model')
const bcrypt = require('bcrypt')

const AddUser = async (data) => {
    try {
        const newUser = await new Users({
            name: data.name,
            email: data.email,
            status: false,
            password: data.password
        }).save()
        
        return newUser
        
    } catch (error) {
        console.log(error)
        throw error
    }
}

const CheckUser = async (data) => {
    const FindUser = await Users.findOne({email: data.email}).select('-__v -createdAt -savedRecipes')
    console.log(data.password)
    console.log(FindUser)
    if(FindUser) {
        // Check Password 
        const successPass = bcrypt.compareSync(data.password, FindUser.password)
        console.log(`hasil pass : ${successPass}`)
        if(!successPass) {
            return {
                status: false,
                message: "Password salah !"
            }
        }
        return {
            status: true,
            data: FindUser
        }
    }else {
        return {
            status: false,
            message: "User tidak ditemukan"
        }
    }
   
}


const CheckUserWithId = async (id) => {
    const currentUser = await Users.findById(id);
    if (!currentUser) {
        return {
            message: 'User tidak di temukan',
            data: null,
            status: false
        }
    } else {
        return {
            message: 'User di temukan',
            data: currentUser,
            status: true
        }
    }
}

module.exports = {AddUser, CheckUser, CheckUserWithId}