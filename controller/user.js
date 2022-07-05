


const knex = require('../db/db')
const bcrypt = require('bcrypt')


function get(req, res, next) {

    if (req.user.is_admin) {

        knex('user').select().where({ is_deleted: false }).then((user) => {
            console.log(req.user);
            return res.json(user)
        })
    }
}

function getById(req, res, next) {

    const { id } = req.params

    if (!id) {
        return res.json({ status: 'id is not passed' })
    }
    else if (req.user.is_admin) {
        knex('user').select().where({ is_deleted: false }).then((user) => {
            console.log(req.user);
            return res.json(user)
        })

    }
}


function post(req, res, next) {
    const { first_name, last_name, email, mobile, password
        , is_admin } = req.body;

    if (!first_name | !email | !mobile | !is_admin in [true, false] | !password) {
        return res.json({ success: false, msg: 'all fields are mandatory ....' })
    }

    bcrypt.hash(password, 10)
        .then(hashedPassword => {
            return knex('user').insert(
                {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    mobile: mobile,
                    password: hashedPassword,
                    is_admin: is_admin
                }).then(() => {
                    knex.select().from('user')
                        .then((user) => {
                            res.json(user.pop())
                        })
                })
        })


}




module.exports = { get, post , getById }

