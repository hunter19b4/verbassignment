// server.js
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

// BASE SETUP -----
// App to use body parser to get data form POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'hunter',
    password: 'password',
    database: 'verbtest_db'
    //,debug: true
});

connection.connect(function(err) {
    if (err) {
        console.error('Error Connecting: ' + err.stack);
        return;
    }
    
    console.log('Connected as ID: ' + connection.threadId);
});


// Set port number
var port = process.env.PORT || 3000;

// API Routes
var router = express.Router();

// for all requests
router.use(function(req, res, next) {
    // do logging
    // console.log('Something is happening.');
    next(); // make sure we go to the next routes
});

// Test Routes
router.get('/', function (req, res) {
    res.json({ message: 'API route working!' });
});

// Register and use rout with prefix /api
app.use('/api', router);
app.use('/styles', express.static(path.join(__dirname, '/app/styles')));
app.use('/json', express.static(path.join(__dirname, '/app/json')));

// GET Route for articles
app.get('/', function (req, res) {
    
    res.sendFile(path.join(__dirname + '/app/views/index.html'));
    
    connection.query("SELECT * FROM articles", function(err, results, fields) {
        if (err) {
            console.log(err);
            //res.send(err);
        }

        fs.writeFile('./app/json/articles.json', JSON.stringify(results), function (err) {
            if (err) {
                console.log(err);
                //res.send(err);
            }
          console.log('Data retrieved!');
        });

        //connection.end();
    });
});

// POST Route for article
router.route('/articles')
    .post(function (req, res) {
        var article_title = escapeRegExp(req.body.article_title);
        var article_content = escapeRegExp(req.body.article_content);

        connection.query("INSERT INTO articles (title, content) VALUES ('" + article_title + "', '" + article_content + "')" , function(err, results, fields) {
            if (err) {
                console.log(err);
                //res.send(err);
            }
            
            res.redirect('/');
            
            //res.json({ message: 'Article Created!' });
        });
    })
    // DELETE Route for article
    .delete(function(req, res) {
        var article_id = req.body.article_id;

            connection.query("DELETE FROM articles WHERE id = " + article_id + "" , function(err, results, fields) {
            if (err) {
                console.log(err);
                //res.send(err);
            }
            
            res.redirect('/');
            
            //res.json({ message: 'Article Created!' });
        });
        
    });


app.get('/add-article', function (req, res) {
    res.sendFile(path.join(__dirname + '/app/views/add-article.html'));
});


// Listen on port...
app.listen(3000, function () {
    console.log('Listening on port ' + port + '!');
});


/**
 * @function escapeRegExp()
 * @param {string} str
 * @returns {string}
 */
function escapeRegExp(str) {
    return str.replace(/[\'\"\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}