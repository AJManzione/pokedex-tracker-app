const { Schema, model } = require("mongoose");

const pokemonSchema = new Schema({

  entry: {
    type: Number,
    required: true,
    trim: true
  }

});

const Pokemon = model("Pokemon", pokemonSchema);

module.exports = Pokemon;
