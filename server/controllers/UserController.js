/**
 * ! Process Register
 * 
 * datanya di ambil dari req.body
 * user.create dari data req.body
 * status code 201 (created)
 * response { success: true, message: "user created"}
 */

 /**
  * ! Process Login
  * 
  * datanya di ambil dari req.body
  * find user(findOne / findall) based on email
  * 
  * ? kalau ada,
  * 
  * cek password(compare pake bycrpt)
  * 
  * ? kalau oke,
  * kita generate JWT
  * 
  * kalau ga,
  * lempar error dengan pesan email atau password salah
  */

const { User, Todo } = require('../models/index.js')

const {comparePassword} = require('../helpers/bcrypt.js')

const {generateToken} = require('../helpers/jwt.js')

class UserController {
  static register = async (req, res, next) => {
    try {
      let theEmail = req.body.email
      let thePassword = req.body.password
      let user = await User.create({ email: theEmail, password: thePassword })
      
      if (!user) {
        throw ({
          status: 400,
          message: `Bad Request`
        })
      }

      res.status(201).json({id: user.id, email:user.email})
    } catch (err) {
      next(err)
    }
  }

  static login = async (req, res, next) => {
    try {
      let theEmail = req.body.email
      let password = req.body.password

      let theUser = await User.findOne({
        where: {
          email: theEmail,
        }
      })
      
      if (theUser && comparePassword(password, theUser.password) === true) {
          let access_token = generateToken(theUser.id,theUser.email)

          res.status(200).json({ access_token })
      } else {
          throw ({
            status: 400,
            message: "email / password is wrong"
          })
      }

    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController