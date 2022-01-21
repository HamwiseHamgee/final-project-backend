import { Router } from "express";
import { getClient } from "../db";
import axios from 'axios';

const routes = Router();

// POST

// #2 - How do we tie this post to our user ID & our API
// Post favorites & rating to OUR API
routes.post("/commute", async (req, res) => {
  // Add your commutes
  const newFavoriteRating = req.body;

  const client = await getClient();

  const results = await client.db().collection('final-project').insertOne({
    rating: newFavoriteRating.rating,
    favorite: newFavoriteRating.favorite,
    userId: newFavoriteRating.userId
  })

  res.json(results);
});

// GET /commute/:user
// example /commute/BJ
// Returns all of commutes for a specific user
// WE want return all of recipes for specific ingredients
routes.get("/:recipe", async (req, res) => {
  try {
    const ingredients = req.params.recipe;
    const client = await getClient();

    const results = await client.db().collection('final-project').find({
    ingredients: ingredients
    })
    .toArray();

    res.set('Cache-Control', 'public, max-age=60, s-maxage=3600');
    res.json(results);
    } catch (err) {
        console.error("ERROR", err);
        res.status(500).json({message: "Internal Server Error"});
    }
});

routes.get('/search/:ingredients', (req, res) => {
// code snippet from API
  const options = {

    params: {
      ingredients: req.params.ingredients,
      number: '5',
      ignorePantry: 'false',
      ranking: '2',
      type: 'drink'
    },
    headers: {
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'x-rapidapi-key': 'bac5b9dc17msh2d4a352662dd6a7p190c49jsn86be79361b22'
    }
  };
  
  axios.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients', options).then(function (response: any) {
    console.log(response.data);
    // sorting logic here

    const cocktails = response.data as any [];

    res.json(cocktails.filter( cocktail  => cocktail.missedIngredientCount === 0))

  }).catch(function (error: any) {
    console.error(error);
    res.json(error.message)
  });
})


// GET /saved/:user
// Returns how much money a specific user has saved

// GET /leaderboard
// Returns the top savers using the app

export default routes;