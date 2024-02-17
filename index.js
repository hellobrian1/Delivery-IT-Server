import { config } from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import express from "express";


config();

const app = express();
const port = 3000;



const dbName = 'Deliver-IT';

const client = new MongoClient(process.env.DB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`this is get`);
});

app.listen(port, () => {
    console.log(`example app listening on port ${port}`);
});

app.post('/registerUser', async (req, res) => {
    if (!req.body || !req.body.email || !req.body.password) {
        return res.status(400).send('Request body must contain email and password');
    }
    try {
        await client.connect();
        const db = client.db(dbName);
        const usersCollection = db.collection('users');
        const newUser = {
            email: req.body.email,
            password: req.body.password
        };
        await usersCollection.insertOne(newUser);

        console.log('User saved successfully');
        res.status(200).json({message : "User Registered"})
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Error saving user');
    } finally {
        // Close the MongoDB connection
        await client.close();
    }
});
