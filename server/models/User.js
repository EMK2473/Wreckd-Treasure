const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const shipWreckSchema = require('./ShipWreck');

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
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },

    savedShipWrecks: [shipWreckSchema],
  },

  {
    toJSON: {
      virtuals: true,
    },
  }
);


userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});


userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


userSchema.virtual('shipWreckCount').get(function () {
  return this.savedShipWrecks.length;
});

const User = model('User', userSchema);

module.exports = User;