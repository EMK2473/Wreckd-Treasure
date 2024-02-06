const { Schema } = require('mongoose');

const shipwreckSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  shipwreckId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  coordinates: {
    type: String,
    required: true,
  },
  reasonForSinking: {
    type: String,
    required: true,
  },
  yearSunk: {
    type: String,
    required: true,
  },
  casualties: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  bodyOfWater: {
    type: String
  },
  description: {
    type: String
  }
});

module.exports = shipwreckSchema;