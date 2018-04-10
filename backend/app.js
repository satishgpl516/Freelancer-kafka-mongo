var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');
var index = require('./routes/index');
var users = require('./routes/users');
var mongoose = require('mongoose');
var keys = require('./config/keys');
require('./models/user');
require('./config/passport')(passport);
const MongoStore = require('connect-mongo')(session);
var fileupload = require('./routes/fileupload');
// var uri = "mongodb+srv://satishkumar:<satish123>@freelancer-aijjq.mongodb.net/test";
// mongoClient.connect(uri, function(err, front-end) {
//     const collection = front-end.db("test").collection("devices");
//     // perform actions on the collection object
//     front-end.close();
// });


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


var corsOptions = {
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    exposedHeaders: ['x-auth-token'],
    optionsSuccessStatus: 200// some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(cors(corsOptions));

var options = {
    host: 'localhost',
    user: 'test',
    password: 'pass',
    database: 'freelancer',
    port: 3306
};


app.use(session(
    {
        secret: 'freelanceapp',
        CookieName: 'session',
        duration: 30 * 60 * 1000,    //setting the time for active session
        activeDuration: 5 * 60 * 1000,
        saveUninitialized: false,
        resave: false,
        store: new MongoStore({
            url : keys.googleAuth.mongoURI
        })
    }));

//connecting mongoose
mongoose.connect(keys.googleAuth.mongoURI);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));
//app.use(cookieParser());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', index);
app.use('/users', users);
app.use('/files', fileupload);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});





// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;


