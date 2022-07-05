const knex = require('../db/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = "any_secret_you_want_to_use"



function login(request, response, next){knex("user")
    .where({email: request.body.username})
    .first()
    .then(user => {
       if(!user){
          response.status(401).json({
             error: "No user by that name"
          })
       }else{
          return bcrypt
          .compare(request.body.password, user.password)
          .then(isAuthenticated => {
             if(!isAuthenticated){
                response.status(401).json({
                   error: "Unauthorized Access!"
                })
             }else{
                return jwt.sign(user, SECRET, (error, token) => {
                    // req.user = user
                   response.status(200).json({token})
                })
             }
          })
       }
    })
 }



 module.exports = { login } //verify} 



