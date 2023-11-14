const express = require("express");
const router = express.Router();
const articleSchema = require("../models/article");

router.get("/new", (req,res) => {
    res.render("../views/articles/newArticle", {article: new articleSchema()});
});

router.get("/:id", (req,res) => {

});

router.post('/', async (req,res) => {
    let article = new articleSchema({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });

    try {
        article = await article.save();
        res.redirect(`/articles/${article.id}`);
    } catch (err) {
        res.render("articles/newArticle", {article: article})
    }
    
});

module.exports = router;