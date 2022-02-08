import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import favorites from './routes/favorites';


const app = express();
app.use(cors());
app.use(express.json());

app.use("/favorites", favorites);


// app.get("/favorites", async (req, res) => {
//     try {
//         const client = await getClient();

//         const results = await client
//         .db()
//         .collection // This is where we left off 1/22
//     }
// })

export const api = functions.https.onRequest(app);