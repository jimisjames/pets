var mongoose = require('mongoose')

var PetSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required dude"], minlength: [3, "Name has a required length of 3 dude"]},
    type: { type: String, required: [true, "Type is required dude"], minlength: [3, "Type has a required length of 3 dude"]},
    description: { type: String, required: [true, "Description is required dude"], minlength: [3, "Description has a required length of 3 dude"]},
    skill_one: { type: String, default: "" },
    skill_two: { type: String, default: "" },
    skill_three: { type: String, default: "" },
    likes: { type: Number, default: 0 }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'} })

mongoose.model('Pet', PetSchema);