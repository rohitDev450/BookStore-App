import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import UserRouter from './Route/UserRouter.js';

const app = express();

mongoose.connect('mongodb://localhost:27017/Bookstore');

const mangersSchema = new mongoose.Schema({
    name: String,
    title: String,
    price: Number,
    category: String,
    image: String
});

app.use(cors());
app.use(express.json());

// Mount the UserRouter with the base URL '/user'
app.use('/user', UserRouter);

const coderModel = mongoose.model("books", mangersSchema);
app.get('/books', (req, res) => {
    coderModel.find({})
        .then((coders) => {
            res.json(coders);
        })
        .catch(() => {
            console.log("connection not established!!!!");
        });
});

app.listen(3001, () => {
    console.log("Server is running OK");
});
