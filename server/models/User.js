const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

//import schema from ShipWreck.js
const shipWreckSchema = require('./ShipWreck');

//create user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'], //regex for email
    },
    password: {
      type: String,
      required: true,
    },
    //associate user with saved shipWrecks
    savedShipWrecks: [shipWreckSchema],
  },
  //set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//pre-save middleware to create password
userSchema.pre('save', async function (next) {
  //if password is new or modified, hash it
  if (this.isNew || this.isModified('password')) {
    //number of rounds run
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds); //hash password
  }

  next();
});

//compare incoming password with hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//virtual to count saved shipWrecks
userSchema.virtual('shipWreckCount').get(function () {
  return this.savedShipWrecks.length;
});

//create model
const User = model('User', userSchema);

module.exports = User;
