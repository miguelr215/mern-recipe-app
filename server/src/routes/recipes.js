import express from 'express';
import mongoose from 'mongoose';
import { RecipeModel } from '../models/Recipes.js';
import { UserModel } from '../models/Users.js';
import { verifyToken } from './users.js';

const router = express.Router();

// GET ALL RECIPES
router.get('/', async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    if (!response) {
      res.json({ message: 'no recipes available' });
    }
    res.json({
      status: 'success',
      total: response.length,
      data: response,
    });
  } catch (error) {
    res.json(error);
  }
});

// CREATE RECIPE
router.post('/', verifyToken, async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

// SAVE RECIPE TO USER
router.put('/', verifyToken, async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

// GET ALL SAVED RECIPES IDS FOR A USER
router.get('/savedRecipes/ids/:userID', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

// GET ALL SAVED RECIPES FOR A USER
router.get('/savedRecipes/:userID', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

export { router as recipesRouter };
