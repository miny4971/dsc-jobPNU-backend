// routes/studies.js

const express  = require('express');
const router = express.Router();
const Study = require('../models/study');
const User = require('../models/user');
// Index 
router.post("/", (req, res) => {
  Study.create(req.body)
    .then((study) => {
      // console.log(study)
      Study.findById(study).populate("user").exec((err, study) => {
        console.log(study)
      })
      res.status(201).json(study);
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
});

// New
router.get("/", async (req, res) => {
  const studies = await Study.find();
  res.status(200).json(studies);
});

// User.findOne()
//   .then(r => console.log(r.id, r._id)) 




module.exports = router;