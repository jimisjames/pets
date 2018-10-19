
var mongoose = require('mongoose'),
Pet = mongoose.model('Pet')


module.exports = {

    all: function(req, res) {
        Pet.find({}).sort({type: ''}).exec(function(err, data){
            if(err){
                console.log("error")
                res.json({message: "Error", error: err});
            } else {
                res.json({message: "Success", data: data});
            }
        })
    },

    new: function(req, res) {
        Pet.findOne({ name: req.body.name }, function (err, data) {
            if (err) {
                console.log(err)
                res.json({message: "Error", error: err});
            } else {
                if(data == null){
                    var pet = new Pet(req.body);
                    pet.save(function (err) {
                        if (err) {
                            console.log('something went wrong');
                            res.json({message: "Error", error: err});
                        } else {
                            //console.log('successfully added a pet!');
                            res.json({message: "Success"});
                        }
                    })
                } else {
                    res.json({message: "Repeat name! This name already exists in the database, please make a unique name!"});
                }
            }
        })
    },

    get: function(req, res, id) {
        Pet.findOne({ _id: id }, function (err, data) {
            if (err) {
                console.log(err)
                res.json({message: "Error", error: err});
            } else {
                res.json({message: "Success", data: data});
            }
        })
    },

    like: function(req, res) {
        Pet.updateOne({ _id: req.body._id }, { $set: {likes: req.body.likes }}, function (err, data) {
            if (err) {
                console.log(err)
                res.json({message: "Error", error: err});
            } else {
                res.json({message: "Success", data: data});
            }
        })
    },

    delete: function(req, res, id) {
    	Pet.deleteOne({ _id: id }, function (err) {
            if (err) {
                console.log('something went wrong');
                res.json({message: "Error", error: err});
            } else {
                //console.log('successfully removed pet');
                res.json({message: "Success"});
            }
        })
    },

    update: function(req, res) {
        Pet.findOne({ name: req.body.name }, function (err, data) {
            if (err) {
                console.log(err)
                res.json({message: "Error", error: err});
            } else {
                if(data == null || data["_id"] == req.body._id){
                    Pet.update({ _id: req.body._id }, { $set: {name: req.body.name, type: req.body.type, description: req.body.description, skill_one: req.body.skill_one, skill_two: req.body.skill_two, skill_three: req.body.skill_three, }}, function (err) {
                        if (err) {
                            console.log('something went wrong');
                            res.json({message: "Error", error: err});
                        } else {
                            //console.log('successfully updated pet');
                            res.json({message: "Success"});
                        }
                    })
                } else {
                    res.json({message: "Repeat name! This name already exists in the database, please make a unique name!"});
                }
            }
        })
    },



}