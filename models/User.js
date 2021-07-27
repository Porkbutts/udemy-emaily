const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  displayName: String,
  imageUrl: String,
  facebookID: String,
  credits: { type: Number, default: 0 },
});

mongoose.model('users', userSchema);
