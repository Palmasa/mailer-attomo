const createError = require("http-errors");
const mongoose = require("mongoose");
const Message = require("../models/message.model");
const mailer = require("../config/mailer.cofing");

module.exports.sendEmails = async (req, res, next) => {
  console.log(req.body.name);

  try {
    // const newMessage = await Message.create(req.body);
    console.log(req.body)
    mailer.sendFinalClient(req.body.email, req.body.rest, req.body.name);
    mailer.sendRestaurant(
      req.body.email,
      req.body.rest,
      req.body.name,
      req.body.phone,
      req.body.message,
      req.body.group
    );
    res.status(201).json(req.body);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      next(
        createError(401, {
          errors: { email: "Email inválido", mensaje: "Mensaje necesario", name: "se necesita un email" },
        })
      );
    } else {
      next(e);
    }
  }
};
