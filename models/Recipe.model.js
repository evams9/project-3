const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'title is required'],
      imageUrl: String
    },

    preparationTime: {
      type: String,
      // required: [true, 'number is required'],
    },

    diners: {
      type: Number,
     //  required: [true, 'number is required'],
    },

    level: {
      type: String,
      // required: [true, 'editorial is required'],
    },
    category: {
      type: String,
      // required: [true, 'genre is required'],
    },

    ingredients: {
      type: [String],
      // required: [true, 'genre is required'],
    },

    description: {
      type: String,
      // required: [true, 'description pages is required'],
    },

    imageUrl: {
      type: String,

    },

    user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
    },
  },
);
module.exports = model('Recipe', recipeSchema);