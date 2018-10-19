var pets = require('../controllers/pets.js')

module.exports = function (app) {

    app.get('/all', function (req, res) {
        pets.all(req, res)
    })

    app.post('/', function (req, res) {
        pets.new(req, res)
    })

    app.get('/one/:id', function (req, res) {
        pets.get(req, res, req.params.id)
    })

    app.patch('/', function (req, res) {
        pets.like(req, res)
    })

    app.delete('/:id', function (req, res) {
        pets.delete(req, res, req.params.id)
    })
    
    app.put('/', function (req, res) {
        pets.update(req, res)
    })


}