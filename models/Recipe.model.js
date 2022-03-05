const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'title is required'],
    },

    preparationTime: {
      type: Number,
      // required: [true, 'number is required'],
    },

    cookingTime: {
      type: Number,
     //  required: [true, 'number is required'],
    },

    totalTime: {
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

    user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
    },
    image: { type: String },
  },
);
module.exports = model('Recipe', recipeSchema);