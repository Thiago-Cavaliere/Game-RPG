const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  health: { type: Number, default: 100 },
  money: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  exp: { type: Number, default: 0 },
  inventory: [{ item: String, amount: Number }],
  equippedItems: {
    shirt: { type: String, default: null },
    pants: { type: String, default: null },
  }
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;
