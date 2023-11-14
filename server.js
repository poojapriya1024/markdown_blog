const express = require("express");
const mongoose = require("mongoose");
const app = express();
const articleRouter = require("./routes/articles");

//connect to database
mongoose.connect("mongodb://127.0.0.1:27017/blog");

//the views are gonna be written in ejs and view engine converts that code into html code
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));

//use that router


app.get('/', (req,res) => {
    const myArticles = [
        {
            title: "Test Article",
            createdAt: new Date,
            description: "Test Description"
        }
    ];

    res.render("articles/index", {articles: myArticles});
});

app.use("/articles", articleRouter);

app.listen(process.env.PORT || 5000);