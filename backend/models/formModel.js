const mongoose = require('mongoose');
const validator = require('validator');

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Name must be entered to submit the form'],
        maxlength: [30,'name must have max character of 30'],
        minlength: [5,'name must have min character of 5 or equal']
    },
    email: {
        type: String,
        required: [true, 'User must enter thier email..'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
      },
      phoneNumber: {
        type: Number,
        required: true,
      },
      dateOfBirth: {
        type: Date,
        required: true,
        validate:{
          validator: function(el) {
            const age = (new Date() - new Date(el)) / (1000 * 60 * 60 * 24 * 365.25)
            return age > 18
          },
          message: 'minimum age required is 18!!'
        }
      }
});


const Form = mongoose.model('Form',formSchema);
module.exports = Form;