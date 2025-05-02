const {Router} = require('express')
const { RegisController, LoginController, CheckTokenValid } = require('../app/users/user.controller')
const router = Router()

router.get('/', (req, res) => {
    res.send('berhasil')
})
router.post('/regis', RegisController)
router.post('/login', LoginController)
router.post('/checkToken', CheckTokenValid)

module.exports = router