const { Schema } = require('mongoose');

// subdocument schema for shipwrecks
const shipwreckSchema = new Schema({
  name: {
    type: String,
  },
  shipWreckId: {
    type: String,
  },
  image: {
    type: String,
  },
  coordinates: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
  reasonForSinking: {
    type: String,
  },
  yearSunk: {
    type: String,
  },
  casualties: {
    type: String,
  },
  country: {
    type: String,
  },
  bodyOfWater: {
    type: String,
  },
  description: {
    type: String,
  },
  rarity: {
    type: String,
  },
  treasure: {
    type: [String],
  },
});

module.exports = shipwreckSchema;
