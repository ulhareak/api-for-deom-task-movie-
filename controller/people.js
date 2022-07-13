

const knex = require('../db/db')

function get(req, res) {
    if (req.user.is_admin) {
        knex('people').select().where({is_deleted : false }).then((people) => {
            return res.json(people)
        })
    }
}

function post(req, res, next) {
    const { name  } = req.body

    if (!name ) {
        return res.json({ success: false, msg: 'name req....' })
    }
    if (req.user.is_admin) {
        knex('people').insert(
            {
                name: name,
            }
        ).then(() => {
            knex.select().from('people').then((people) => {
                res.send(people.pop())
            })
        })
    }
}

const patch = (req, res, next) => {
    const id = req.params.id
    const name  = req.body.title
    if( !name ){
        return res.json({succsess : true , msg : "enter name"})
    }
    if (req.user.is_admin) {
        knex('people').update(
            {
                name: name
            }
        ).where({id : id }).then((people ) => {
            res.json(people)
        })
    }
}

function delete_rec( req , res , next ){
    const id = req.params.id

    if( !id ){
        return res.json({succsess : true , msg : "give id "})
    }

    if (req.user.is_admin) {
        knex('people').update(
            {
                is_deleted : true
            }
        ).where({id : id }).then((people ) => {
            res.json(people)
        })

    }

}

module.exports = { get, post , patch , delete_rec }