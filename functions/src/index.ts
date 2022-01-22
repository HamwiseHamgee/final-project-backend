import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import routes from './routes/apiRoute';
import { getClient } from './db';
import Recipe from './models/recipe';

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", routes);
app.get("/recipes", async (req, res) => {
    // try means: try to do this, and if it doesn't work return the catch
    try {
        const client = await getClient();

        // call the mongodb
          const results = await client
          .db()
        // convert the data into an array
          .collection<Recipe>('recipes')
          .find()
          .toArray()
        // return that data to the browser
        res.json(results);
      
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }

});

app.get("/favorites", async (req, res) => {
    try {
        const client = await getClient();

        const results = await client
        .db()
        .collection // This is where we left off 1/22
    }
})

export const api = functions.https.onRequest(app);