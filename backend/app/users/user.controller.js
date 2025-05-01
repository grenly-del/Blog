const { HTTP_STATUS_CODE } = require('../../constant/httpCode');
const { appRes } = require('../../utils/appRes');
const {RequestUser} = require('../../validations/userValidation');
const { CheckUser } = require('./user.repository');
const { CreateUser, CreateToken, CheckToken } = require('./user.service');

const RegisController = async (req, res, next) => {
    try {
        const dataRes = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        // Validation
        const result = RequestUser.safeParse(dataRes)
        if(!result.success) {
            const errorMessages = result.error.errors.map(err => err.message);
            console.log(errorMessages)
            next(new Error(errorMessages[0]))
        }else {
            // hash password
            const result = await CreateUser(dataRes)
            if(result) {
                appRes(res, HTTP_STATUS_CODE.CREATED, result)
            }
        }
        

    } catch (error) {
        next(error)
    }
}



const LoginController = async (req, res, next) => {
    try {
        const {email, password} = req.body

        // Check Akun
        const checkUser =await  CheckUser({
            email,
            password
        })
        console.log(checkUser)
        if(checkUser.status === true) {

            // Create Token
            const token = CreateToken({
                userId: checkUser.data._id,
                username: checkUser.data.name
            })
            console.log(token)
            appRes(res, HTTP_STATUS_CODE.OK, 'berhasil login', {
                token: token
            })
        }else {
            console.log(checkUser)
            next(new Error(checkUser.message))
        }


    } catch (error) {
        next(error)
    }
}

const CheckTokenValid = async (req, res, next) => {
    try {
        const {token} = req.body
        console.log(token)
        const checkToken = await CheckToken(token)
        console.log(checkToken)
        if(checkToken.status) {
            appRes(res, HTTP_STATUS_CODE.OK, 'Token valid', {status: true})
        }else {
            throw new Error (checkToken.message)
        }


    } catch (error) {
        console.log(`error`)
        next(error)
    }
}
module.exports = {RegisController, LoginController, CheckTokenValid}