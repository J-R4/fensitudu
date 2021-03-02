function errHandler(err, req, res, next) {
if (err.message.name == `SequelizeValidationError`) {
    res.status(err.status).json({ message: err })
} else if (err.status) {
      res.status(err.status).json({message: err})
    }
}

module.exports = errHandler