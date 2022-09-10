const express = require('express');
const articlesRouter = require('./routes/articles')
const Articles = require('./models/articles')
const mongoose = require('mongoose')

const app = express();

mongoose.connect('mongodb://localhost:27017/blog')
    .then(() => console.log('Connected to db'))
    .catch((err) => console.log("Error", err));

app.use(express.static('public'));

app.use(express.urlencoded());

app.set('view engine', 'ejs');

app.use("/articles", articlesRouter);

app.get("/", async (req, res) => {
    const article = await Articles.find({})
    res.render('index',{ articles: article });
});

app.listen(8000);