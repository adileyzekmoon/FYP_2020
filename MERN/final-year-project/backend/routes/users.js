const express = require('express');
const router = express.Router();
var User = require('../models/user');

router.get('/history', (req, res, next) => {
    console.log("backend")
  User.find((err, user) => {
        if(err){
            res.send(err);
            console.log("err")
        }
         res.send(user);
//      res.send('Test')
        });
});


router.post('/add', (req, res) => {
  let data = new User();

  const { name, recovData, date } = req.body;

  data.name = name;
    data.recovData = recovData;
    data.date = date;

  data.save((err) => {
    if(err)
      return res.json({ success: false, error: err });

    return res.json({ success: true });
  })
});

module.exports = router
