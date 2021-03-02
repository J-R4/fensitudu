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

const jwt = require('jsonwebtoken');

class UserController {
  static register = async (req, res, next) => {
    try {
      let email = req.body.email
      let password = req.body.password
      let user = await User.create({ email, password })

      res.status(201).json(user)
    } catch (err) {
      next({
        status: 400,
        message: err ? err : `Bad Request`
      })
    }
  }

  static login = async (req, res, next) => {
    try {
      let email = req.body.email
      let password = req.body.password
      let theUser = await User.findOne({
        where: {
          email: email,
        }
      })
      if (theUser) {
        if (comparePassword(password, theUser.password)) {
          let access_token = jwt.sign({
              id: theUser.id,
              email: theUser.email
          }, process.env.JWT_SECRET || process.env.example.JWT_SECRET);

          res.status(200).json({ access_token })
        } else {
          throw {msg: "email / password is wrong"}
        }
      } else {
        throw { msg: "email / password is wrong"}
      }
    } catch (err) {
      let errorMessage

      if (err.msg) errorMessage = err.msg
      else errorMessage = `internal server error`
      
      res.status(500).json({ message: errorMessage })
    }
  }
}

module.exports = UserController