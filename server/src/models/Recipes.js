import mongoose from 'mongoose';

const RecipeSchema = mongoose.Schema({
  name: { type: String, required: [true, 'A name is required'] },
  ingredients: [
    { type: String, required: [true, 'At least 1 ingredient is required'] },
  ],
  instructions: { type: String, required: [true, 'Instructions are required'] },
  imageUrl: { type: String, required: [true, 'An image is required'] },
  cookingTime: { type: Number, required: [true, 'Cooking time is required'] },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: [true, 'A user owner (creater) is required'],
  },
});

export const RecipeModel = mongoose.model('recipes', RecipeSchema);
