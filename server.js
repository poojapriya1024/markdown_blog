const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles");
const Article = require("./models/article");
const methodOverride = require("method-override");

const app = express();

//connect to database
mongoose.connect("mongodb://127.0.0.1:27017/blog");

//the views are gonna be written in ejs and view engine converts that code into html code
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));

//use that router


app.get('/', async (req,res) => {
    
    const myArticles = await Article.find().sort({
        createdAt: "desc"});
    res.render("articles/index", {articles: myArticles});
});

app.use("/articles", articleRouter);

app.listen(process.env.PORT || 5000);