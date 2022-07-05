



const knex = require('../db/db')


function get(req, res, next) {
    knex('genre').select().then((genre) => {
        return res.json(genre)
    })
}


function post(req, res, next) {
    const { name } = req.body
    if (!name) {
        return res.json({ success: false, msg: 'name is req.' })
    }

    if (req.user.is_admin) {
        knex('genre').insert(
            {
                name: name
            }
        ).then(() => {
            knex.select().from('genre')
                .then((genre) => {
                    res.send(genre.pop())
                })
        })

    }


}


module.exports = { get, post }


