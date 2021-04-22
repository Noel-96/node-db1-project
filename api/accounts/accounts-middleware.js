const accounts = require("../accounts/accounts-model")

exports.checkAccountPayload  = () => {
  // DO YOUR MAGIC
  return (req, res, next) => {
    if(!req.body.name || !req.body.budget){
      return res.status(400).json({
        message: "name and budget are required"
      })
    } else if(typeof req.body.name !== "string") {
        return res.status(400).json({
        message: "name of account must be a string"
        })
    } else if(typeof req.body.budget !== "number") {
        return res.status(400).json({
          message: "budget of account must be a number"
        })
    } else if(req.body.budget < 0 ) {
      return res.status(400).json({
        message: "budget of account can not be negative"
      })
    }
    next()
  }
}

exports.checkAccountNameUnique  = () => {
  // DO YOUR MAGIC
  return (req, res, next) => {
    accounts.getAll()
      .then(accounts => {
        if(accounts.find({
          username: req.body.name.trim()
        })) {
          return res.status(400).json({
          message: "that name is taken"
          })
        }

        next()
      })
    }
}

exports.checkAccountId  = () => {
  // DO YOUR MAGIC
  return (req, res, next) => {
    accounts.getById(req.params.id)
    .then(account => {
      if(account) {
        req.account = account
        next()
    } else {
        res.status(404).json({
          message: "account not found"
        })
      }
   })

    .catch(next)
  }
}
