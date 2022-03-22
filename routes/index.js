const router = require('express').Router();
const Recipe = require('../models/Recipe.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

router.get('/', (req, res, next) => {
  res.json('All good in here');
});

const fileUploader = require("../config/cloudinary.config");

  // Ruta para ver todas las recetas
  router.get('/recipes/all', async (req, res) => {
    try {
      const recipe = await Recipe.find({});
      res.json({ recipe });
    } catch (e) {
      next(e);
    }
  });

  // Ruta cloudinary
  router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  console.log("file is: ", req.file)
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
    res.json({ fileUrl: req.file.path });
});

  // Ruta POST para crear nuevas recetas
  router.post('/recipes/new', isAuthenticated, async (req, res, next) => {
    const userId = req.payload._id;
    console.log('Llega al backend', req.body)
    const { name, preparationTime, diners, level, category, ingredients, description, imageUrl } = req.body;

    try {
      const newRecipe = await Recipe.create({
        name, 
        preparationTime, 
        diners, 
        level, 
        category, 
        ingredients, 
        description, 
        imageUrl,
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
  router.put('/recipes/edit/:id', isAuthenticated, async (req, res, next) => {
    const recipeId = req.params.id;
    const { name, preparationTime, diners, level, category, ingredients, description, imageUrl} = req.body;
    try {
      const recipe = await Recipe.findByIdAndUpdate(
        recipeId,
        {
          name, 
          preparationTime, 
          diners,
          level, 
          category, 
          ingredients, 
          description, 
          imageUrl,
        },
        { new: true },
      );
      console.log('Updated', recipe);
      res.json(recipe);
    } catch (e) {
      next(e);
    }
  });

  // Ruta para borrar una receta
  router.delete('/recipes/delete/:id', isAuthenticated, async (req, res, next) => {
    const recipeId = req.params.id;
    try {
      const recipe = await Recipe.findByIdAndDelete(recipeId);
      res.json({recipe});
    } catch (e) {
      next(e);
    }
  });


module.exports = router;
