const express = require('express');
const articles = require('../models/articles');

const router = express.Router();

router.get('/new',(req,res)=>{
    res.render('articles/new')
})

router.get('/:id',(req,res)=>{
    console.log(req.params.id);
    let id = req.params.id.substring(1);
    console.log(id);
    const article = articles.findById(id,function(err,docs){
        if(err){
            console.log(err);
        }
        else{
            console.log("Result :",docs);
        }
    });
    console.log(article);
    res.render("articles/detail",{article:article});
})
router.post('/add',async(req,res)=>{
    console.log(req.body)
    console.log(req.body.title)
    const article = new articles({
        title:req.body.title,
        body:req.body.body
    })
    await article.save()
    res.redirect('/')
})

module.exports = router;
