/**
 * middleware
  - authentication
    - buat middleware authentication
    - ambil token via headers
    - decoded menggunakan jwt.verify(token, secret)
    - assign user yg sedang login ke req.currentUser
    - cek valid user atau tidak. kalau valid next, kalau tidak respon error
  - authorization
    - buat middleware authorization 
    - cek resource nya milik user yg sedang login atau bukan
    - cek valid user atau tidak. kalau valid next, kalau tidak respon error

environment variables
  - variable yg ada di komputer / system
  - npm i dotenv
  - panggil require('dotenv').config() di paling awal aplikasi
  - buat file .env di root path
  - pastikan .env di run hanya di environment development, kenapa ? karena kalau di server/production bisa gak pake .env 
    menggunakan process.env.NODE_ENV
  - NODE_ENV=development node app.js (atau tambahin ke scripts di package json)
    -  "dev": "NODE_ENV=development sequelize app.js"
    - npm run dev

  windows:
  - pake SET NODE_ENV=...
  - atau install cross-env, cros-env NODE_ENV=...
 */

const { verifyToken } = require('../helpers/jwt');

const { User, Todo } = require('../models');

const authenticate = async (req, res, next) => {
    try {
        let token = verifyToken(req.headers.access_token);

        let user = await User.findOne({
            where: { id: token.id, email: token.email },
        });

        if (user) {
            req.currentUser = { id: user.id, email: user.email };
            next();
        } else {
            throw {
                status: 401,
                message: `Unauthorized`,
            };
        }
    } catch (err) {
        next(err);
    }
};

const authorize = async (req, res, next) => {
    try {
        let target = +req.params.id;

        let todo = await Todo.findByPk(target);
        if (todo) {
            let validUserTodo = todo.UserId === req.currentUser.id;

            if (validUserTodo) {
                next();
            } else {
                throw {
                    status: 401,
                    message: `unauthorized`,
                };
            }
        } else {
            throw {
                status: 401,
                message: `unauthorized`,
            };
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    authenticate,
    authorize,
};
