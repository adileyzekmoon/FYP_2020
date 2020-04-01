const express = require('express');
const router = express.Router();
var User = require('../models/user');

router.get('/history', (req, res, next) => {
    const param = req.query.name;
  User.findOne({name:param}, (err, user) => {
        if(err){
            res.send(err);
            console.log("err")
        }
         res.send(user);
//      res.send('Test')
        });
});


router.post('/add', (req, res) => {

  const { name, date, result } = req.body;


  User.findOneAndUpdate({name:name},
                     {$push: {data: {result: result,
                                    date: date}}
                        },
                     {upsert: true} , (err) => {
    if(err){
        console.log("error");
      return res.json({ success: false, error: err });}
    console.log("backend update");
    return res.json({ success: true });
  })
});

router.post('/login', (req, res) => {


    console.log(req.body);

  const { email, password } = req.body;


  User.findOne({$and:[{email:email,
                password: password}]}
                      , (err, user) => {
    if(err){
        console.log("error");
      return res.json({ success: false, error: err });}
    console.log(user);
    res.send(user);
  })
});

module.exports = router
