//blue print for using express
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4 : uuidv4 } = require('uuid');
const methodOverride = require("method-override");


//allows express to parse data from the page (undefined by default)
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//sets view engine to ejs allowing ejs to work
app.set("view engine", "ejs");
//creates a static path for views directory
app.set("views", path.join(__dirname, "views"));
//created static path for public directory
app.use(express.static(path.join(__dirname, "public")));

//using array posts like a database and resource
let posts = [
    {
        id: uuidv4(),
        username: "Samiksha",
        content: "I am learning web-dev!"
    },
    {
        id: uuidv4(),
        username: "yashsharma",
        content: "Hardwork is important to achieve success."
    },
    {
        id: uuidv4(),
        username: "rahulgupta",
        content: "I got selected for my first internship!"
    },
]

//sets a get request on server to display .ejs file
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

//sets a get request on server to display new.ejs file
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

//adds a post request to /posts path
app.post("/posts", (req, res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts"); //sends get req by default to /posts
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;    
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    //adding filter to posts[] for selected id
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

//server is started
app.listen(port, () => {
    console.log(`listening to port : ${port}`);
});