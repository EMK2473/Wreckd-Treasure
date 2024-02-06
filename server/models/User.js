const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

<<<<<<< HEAD
//import schema from ShipWreck.js
=======

>>>>>>> main
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
<<<<<<< HEAD
    //associate user with saved shipWrecks
    savedShipWrecks: [shipWreckSchema],
  },
  //set this to use virtual below
=======

    savedShipWrecks: [shipWreckSchema],
  },

>>>>>>> main
  {
    toJSON: {
      virtuals: true,
    },
  }
);

<<<<<<< HEAD
//pre-save middleware to create password
=======

>>>>>>> main
userSchema.pre('save', async function (next) {
  //if password is new or modified, hash it
  if (this.isNew || this.isModified('password')) {
    //number of rounds run
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds); //hash password
  }

  next();
});

<<<<<<< HEAD
//compare incoming password with hashed password
=======

>>>>>>> main
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

<<<<<<< HEAD
//virtual to count saved shipWrecks
=======

>>>>>>> main
userSchema.virtual('shipWreckCount').get(function () {
  return this.savedShipWrecks.length;
});

//create model
const User = model('User', userSchema);

module.exports = User;
