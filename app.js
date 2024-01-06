//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Welcome to the home page";
const aboutContent = "This is the about content";
const contactContent = "Feel free to contact us";

const app = express();

const _ = require('lodash');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postTitles = [""];
const postBodies = [""];
const posts = [""];


app.get("/", function(req,res){
  res.render("home",{homeContent: homeStartingContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.get("/about", function(req,res){
  res.render("about", {aboutCont: aboutContent});
});

app.get("/contact", function(req,res){
  res.render("contact", {contactCont: contactContent});
});

app.get("/posts", function(req,res){
  res.render("posts", {posts:posts});
});

app.post("/compose", function(req, res){

  const post= {title: req.body.postTitle, content: req.body.postBody };
  // let postHeading = req.body.composeTitle;
  // let postBody = req.body.composeBody;
  // postTitles.push(postHeading);
  // postBodies.push(postBody);
  posts.push(post)
  res.redirect("/posts");
});

app.get("/readmore", function(req,res){
  res.send("Aight");
});

app.get("/posts/:postName", function(req, res){

  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if(storedTitle===requestedTitle){
      res.render("readmore", {title: post.title, content: post.content});
      // res.redirect("/readmore");
    }// if


  });// for each
  
});// get postName






app.listen(4040, function() {
  console.log("Server started on port 4040");
});
