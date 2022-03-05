const router = require('express').Router();
const Recipe = require('../models/Recipe.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

router.get('/', (req, res, next) => {
  res.json('All good in here');
});

  // Ruta para ver todas las recetas
  router.get('/recipes/all', async (req, res) => {
    try {
      const recipe = await Recipe.find({});
      res.json({ recipe });
    } catch (e) {
      next(e);
    }
  });

  // Ruta POST para crear nuevas recetas
  router.post('/recipes/new', isAuthenticated, async (req, res, next) => {
    const userId = req.payload._id;
    const { name, preparationTime, coockingTime, totalTime, level, category, ingredients, description, image } = req.body;

    try {
      const newRecipe = await Recipe.create({
        name, 
        preparationTime, 
        coockingTime, 
        totalTime, 
        level, 
        category, 
        ingredients, 
        description, 
        image,
        user: userId,
      });
      res.json({newRecipe});
    } catch (e) {
      next(e);
    }
  });

  // Ruta para ver mis recetas
  router.get('/recipes/mine', isAuthenticated, async (req, res, next) => {
    const user = req.payload;
    try {
      const recipes = await Recipe.find({ user: user._id });
      res.json({ recipes });
    } catch (e) {
      next(e);
    }
  });

 // Ruta para ver el detalle de una receta
  router.get('/recipes/:id', async (req, res, next) => {
    const recipeId = req.params.id;
    try {
      const recipe = await Recipe.findById(recipeId);
      res.json({ recipe });
    } catch (e) {
      next(e);
    }
  });

  // Ruta para editar una receta
  router.post('/recipes/edit/:id', isAuthenticated, async (req, res, next) => {
    const recipeId = req.params.id;
    const { name, preparationTime, coockingTime, totalTime, level, category, ingredients, description, image} = req.body;
    try {
      const recipe = await Recipe.findByIdAndUpdate(
        recipeId,
        {
          name, 
          preparationTime, 
          coockingTime, 
          totalTime, 
          level, 
          category, 
          ingredients, 
          description, 
          image,
        },
        { new: true },
      );
      console.log('Updated', recipe);
      res.json({recipe});
    } catch (e) {
      next(e);
    }
  });

  // Ruta para borrar una receta
  router.get('/recipes/delete/:id', isAuthenticated, async (req, res, next) => {
    const recipeId = req.params.id;
    try {
      const recipe = await Recipe.findByIdAndDelete(recipeId);
      res.json({recipe});
    } catch (e) {
      next(e);
    }
  });


module.exports = router;
