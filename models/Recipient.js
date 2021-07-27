const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = new Schema({
  email: String,
  responded: { type: Boolean, default: false },
});
