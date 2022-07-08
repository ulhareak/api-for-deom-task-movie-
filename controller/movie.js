



const knex = require('../db/db')


function get(req, res, next) {
 knex('movie').select().then((movie) => {
        res.json(movie)
    })
}


function post(req, res) {
    const { genre_id, title, director_id, duration, info } = {
        genre_id: genre_id,
        title: title,
        director_id: director_id,
        duration: duration,
        info: info
    }

    if (!title) {
        return res.json({ success: false, msg: 'title is required...' })
    }

    if (req.user.is_admin) {
     knex('movie').insert(
            {
                genre_id: genre_id,
                title: title,
                director_id: director_id,
                duration: duration,
                info: info
            }).then(() => {
             knex.select().from('movie')
                    .then((user) => {
                        res.send(movie.pop())
                    })
            })

    }
}

module.exports = { get, post }