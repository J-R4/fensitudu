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

class UserController {
    //
}

module.exports = UserController