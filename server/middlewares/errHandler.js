function errHandler(err, req, res, next) {
    console.log(err)
    if (err.name == `SequelizeValidationError`) {
        let msg = []
        err.errors.forEach((mes,i) => {
            msg.push(mes.validatorArgs[0].message)
        });
        res.status(400).json({
            message: `Validation Error`,
            detail: msg
        })
    } else if (err.status) {
        res.status(err.status).json({message: err.message })
    } else {
        res.status(500).json({message: err })
    }
    
}

module.exports = errHandler