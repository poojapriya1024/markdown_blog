const express = require("express");
const router = express.Router();
const articleSchema = require("../models/article");

router.get("/new", (req,res) => {
    res.render("../views/articles/newArticle", {article: new articleSchema()});
});

router.get("/edit/:id", async (req,res) => {
    const article = await articleSchema.findById(req.params.id);
    res.render("edit", {article: article});
});

// router.get("/edit/:id", async (req, res) => {
//     try {
//         const article = await articleSchema.findById(req.params.id);
//         if (article == null) {
//             return res.redirect("/");
//         }
//         res.render("edit", { article: article });
//     } catch (err) {
//         console.error(err);
//         res.redirect("/"); res.render("articles/edit", { article: article });

//     }
// });

router.get("/:slug", async (req,res) => {
    const article = await articleSchema.findOne({slug : req.params.slug});
    if(article == null) res.redirect("/");
    res.render("articles/show", {article : article});
});

router.post('/', async (req,res, next) => {
    req.article = new articleSchema();
    next();
}, saveArticleAndRedirect("new"));

router.put('/:id', async (req,res, next) => {
    req.article = await articleSchema.findById(req.params.id);
    next(); //go to the next function
}, saveArticleAndRedirect("edit"));

router.delete("/:id", async (req,res) => {
    await articleSchema.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

function saveArticleAndRedirect(path) {
     return async (req,res) => {
        let article = req.article;
        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;
        
        try {
            article = await article.save();
            res.redirect(`/articles/${article.slug}`);
        } catch (err) {
            console.log(err);
            res.render(`articles/${path}`, {article: article})
        }
    }
}
module.exports = router;