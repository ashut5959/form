const Form = require("../models/formModel.js");
const sendEmail = require('../utils/email.js');


exports.forms = async (req, res) => {
  try {
    const newForm = await Form.create({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      dateOfBirth: req.body.dateOfBirth,
    });

    console.log(req.body.dateOfBirth)
    console.log(newForm);

    await sendEmail({
        email: newForm.email,
        subject: 'Thank you for registering!',
        message: 'Thank you for registering!',
      });

    res.status(200).json({
      status: "Success",
      data: {
        newForm,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
};

exports.getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();

    res.status(200).json({
      status: "success",
      data: {
        forms,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
};
