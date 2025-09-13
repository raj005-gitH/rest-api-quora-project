const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Fake DB
let posts = [
  { id: uuidv4(), username: "Samiksha", content: "I am learning web-dev!" },
  { id: uuidv4(), username: "yashsharma", content: "Hardwork is important to achieve success." },
  { id: uuidv4(), username: "rahulgupta", content: "I got selected for my first internship!" }
];

// Routes
// Default route - redirect to /posts
app.get("/", (req, res) => {
  res.redirect("/posts");
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  const { username, content } = req.body;
  posts.push({ id: uuidv4(), username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).send("❌ Post not found");
  }

  res.render("show", { post });
});


app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).send("❌ Post not found");
  }

  res.render("edit", { post });
});

app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);
  
  if (!post) {
    return res.status(404).send("❌ Post not found");
  }

  post.content = req.body.content;
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((p) => p.id !== id);
  res.redirect("/posts");
});

// ✅ Only one listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
