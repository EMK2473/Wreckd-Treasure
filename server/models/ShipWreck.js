const { Schema } = require('mongoose');

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
    type: String,
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
    type: String
  },
  description: {
    type: String
  },
  rarity: {
    type: String
  },
  treasure: {
    type: [String]
  }
});

module.exports = shipwreckSchema;