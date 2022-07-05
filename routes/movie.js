


const router  = require('express').Router()


router.get('/', require('../controller/movie').get)
// router.get('/:id', require('../controller/movie').getbyId)
// router.post('/', require('../controller/movie').post)
// router.put('/:id', require('../controller/movie').put)
// router.patch('/:id', require('../controller/movie').patch)
// router.delete('/:id', require('../controller/movie').delete)


module.exports = {router}

