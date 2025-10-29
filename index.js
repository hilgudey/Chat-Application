const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Chat = require('./models/chat');

const methodOverride = require('method-override');

app.use(methodOverride('_method'));


// ✅ Connect to MongoDB
main()
  .then(() => console.log("✅ MongoDB connection successful"))
  .catch(error => console.log("❌ Connection error:", error));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// ✅ View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// ✅ Middleware used to passed data
app.use(express.urlencoded({ extended: true }));

// ✅ Home route
app.get("/", (req, res) => {
  res.redirect("/chats"); // redirect to chats
});

// new route
app.get("/chats/new", (req,res)=>{
  res.render("new.ejs");
});

//edit route
app.get("/chats/:id/edit", async (req,res)=>{
  const {id} = req.params;
  const chat = await Chat.findById(id);
  res.render("edit.ejs", {chat});
});

//update route

app.put("/chats/:id", async (req,res)=>{
  let { id }=req.params;
  let {msg :newMsg} = req.body;
  let updatedChat=Chat.findByIdAndUpdate(id, {msg:newMsg}, {new:true});
  await updatedChat.save();
  res.redirect("/chats");
}
);


// Create route to handle new chat form submission
app.post("/chats", async (req, res) => {
  let { from, to, msg } = req.body;
  const chat = new Chat({ from, to, msg });
  await chat.save(); // save new chat to DB
  res.redirect("/chats"); // redirect to chats
});

// ✅ Chats route - show all chats
app.get("/chats", async (req, res) => {
  let chats = await Chat.find(); // fetch all chats from DB
  res.render("index", { chats }); // render index.ejs
});

// ✅ Start server
app.listen(8080, () => {
  console.log("🚀 Server running at http://localhost:8080");
});
