import { Router } from "express";
import { getClient } from "../db";
// import axios from 'axios';

const routes = Router();

routes.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const cocktailId = req.query.cocktailId;

    const client = await getClient();

    if (cocktailId) {
        // get from database by cocktailId
        const results = await client.db().collection('favorites').find({userId, id:cocktailId}).toArray();
        res.json(results);
    } else {
        // get from database by userId
        const results = await client.db().collection('favorites').find({userId}).toArray();
        res.json(results);
    }
}) 

routes.post('/:userId', async (req, res) => {
    const cocktail = req.body
    const favorite = { ...cocktail, userId: req.params.userId } // adding this to the MongoDB

    const client = await getClient();
    const results = await client.db().collection('favorites').insertOne(favorite);
    res.json(results);
})

routes.delete('/:userId/:cocktailId', async (req, res) => {
    
    const client = await getClient();
    const results = await client.db().collection('favorites').deleteMany({userId: req.params.userId, id: parseInt(req.params.cocktailId)});
    res.json(results);
})

export default routes;