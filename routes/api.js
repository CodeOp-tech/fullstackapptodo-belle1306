var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

router.get("/todos", (req, res) => {
  // Send back the full list of items
  db("SELECT * FROM items ORDER BY id ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

router.post("/todos", (req, res) => {
  // The request's body is available in req.body
  // If the query is successfull you should send back the full list of items
  // Add your code here
  const newText = req.body.text;
  const newComplete = req.body.complete;
  db(
    `INSERT INTO items (text, complete) VALUES(${JSON.stringify(
      newText
    )}, ${newComplete});`
  ) //check how to stringify
    .then(results => {
      results.data = results.insertId;
      console.log(results, insertId, "is the id, also data: \n", results.data);
      res.send(results);
      console.log("Updated");
    })

    .catch(err => res.status(500).send(err));
  //console.log("ID not found");
});

router.put("/todos/:todo_id", (req, res) => {
  // The request's body is available in req.body
  // URL params are available in req.params
  // If the query is successfull you should send back the full list of items
  // Add your code here
  //const newID = req.params['todo_id'];
  //const newText = req.body.text;
  db(`UPDATE items SET text= ${JSON.stringify(
    req.body.text
  )},complete ={req.body.complete}
  WHERE id = ${req.params.todo_id};`)
    //check how to WHERE id = ?', [columns, 'users', userId]

    .then(results => {
      res.send(results.data);
      console.log(results.data);
      res.status(200).send("Updating item");
    })
    .catch(err => res.status(500).send(err));
  // console.log("No matching id found");
});

router.delete("/todos/:todo_id", (req, res) => {
  // URL params are available in req.params
  // from pokemon for (let i = 0; i < this.task.length; i++) {
  //   //console.log(data[i]);
  //   if (parseInt(data[i].id) === parseInt(req.params.id)) {
  //     return res.send(data[i]);
  //   }
  db(`DELETE FROM items WHERE id= parseInt(req.params.id)`)
    .then(results => {
      res.send(results.data);
      console.log("Successfuly deleted");
    })
    .catch(err => res.status(500).send(err));
  console.log("No matching id found");
});

module.exports = router;
