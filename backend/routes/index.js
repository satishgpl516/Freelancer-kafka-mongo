var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
   console.log(req.user);
   console.log(req.isAuthenticated());
    console.log(req.session.username);
   // res.render('index', { title: 'Express' });
    res.status(201).send("success");
});


module.exports = router;
