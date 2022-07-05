




const knex = require('../db/db')


function get(req, res) {
 knex('people').select().then((movie) => {
        return res.json(movie)
    })
}

function post(req, res, next) {
    const { fname, lname, gender, age } = req.body

    if (!fname | !lname | !gender) {
        return res.json({ success: false, msg: 'fname , lname and gender req....' })
    }
    if (req.user.is_admin) {
     knex('people').insert(
            {
                fname: fname,
                lname: lname,
                gender: gender,
                age: age
            }
        ).then(() => {
         knex.select().from('people').then((people) => {
                res.send(people.pop())
            })
        })
    }
}

const put = (req , res , next  )=>{

}  


module.exports = { get, post }