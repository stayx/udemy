const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const Schema = mongoose.Schema;
const router = express.Router();

app.use(bodyParser.json());
app.listen(4000, () => {
  console.log("server is up and running on port 4000");
});

//remplacer avec votre string connection
// <username> : le username de votre choix à la création d'un nouveau user
// <password> : noter et conserver ce password
// <database> : le nom de la base de données que vous avez crééé
const db = "mongodb://root12:root12@ds153947.mlab.com:53947/completive";

mongoose
  .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("successfully connected to db"))
  .catch((err) => console.log(err));

//Schema
let userSchema = new Schema({
  /*text: String,
  isCompleted: Boolean,*/
  name: String,
  prenom : String,
  class : String,
});

let User = mongoose.model("User", userSchema);

//Routes
app.use("/todos", router);

//get all documents from DB
router.route("/").get(function (req, res) {
  User.find(function (err, items) {
    if (err) {
      console.log(err);
    } else {
      res.json(items);
    }
  });
});

//add new document to DB
router.route("/add").post(function (req, res) {
  let note = new User(req.body);
  note
    .save()
    .then(() => {
      console.log("todo saved successfully");
      res.status(200).json("todo saved successfully");
    })
    .catch((err) => {
      res.status(400).send("adding to todos failed");
    });
});

//update todo
router.route("/:id").put(function (req, res) {
  console.log(req.params.id);
  User.findById(req.params.id, function (err, user) {
    if (err) {
      res.send(err);
    }
    /*user.text = req.body.text;
    user.isCompleted = req.body.isCompleted;*/
    user.name = req.body.name;
    user.prenom = req.body.prenom;
    user.class = req.body.class;
    
    user.save(function (err) {
      if (err) {
        res.send(err);
      }
      console.log("todo updated successfully");
      res.json({ message: "Bravo, mise à jour des données OK" });
    });
  });
});

//remove from DB
router.route("/:id").delete(function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) {
      res.send(err);
    }
    user.save(function (err) {
      if (err) {
        res.send(err);
      }
      console.log("todo updated successfully");
      res.json({ message: "todo deleted successfully" });
    });
  });
});
