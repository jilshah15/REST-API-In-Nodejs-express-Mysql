var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'employee'
});

mysqlConnection.connect((err) => {
    if (err) {
        console.log("Database Connection Fail")
    }
    else {
        console.log("Database Connected Successfully")
    }
})
app.listen(8080, function (err) {
    if (err) {
        console.log("Not Connected to server")
    }
    else {
        console.log("server listening on Port 8080")
    }
})
app.get('/',function(req,res){
    res.send("welcome")
})
//Display Records 
app.get('/emp', function (req, res) {
    mysqlConnection.query("SELECT * FROM EMP", function(err, rows, fields) {
        if (!err){
            res.status(200).send(rows)
           
        }
        else{
            res.status(404).send(err)
        }
    })  
})
//give id nd get records
app.get('/emp/:eid',(req,res) => {
    mysqlConnection.query("SELECT * FROM EMP WHERE EID="+req.body.eid+"", function(err, rows, fields) {
        if (!err){
            res.send(rows);
        }
        else{
            console.log(err)
        }
    });
})
//URL:http://localhost:8080/emp/:7



//Insert Record In Database
app.post('/emp/add', function (req, res) {
    mysqlConnection.query("INSERT INTO EMP(ename,eaddr) VALUES('" + req.body.ename+ "','" + req.body.eaddr+ "')",  function(err, results) {
        if (!err){
            res.send({"insert":"success"});
       }
        else{
            res.send({"insert":"fail"});
            console.log(err);
        }
    })  
})
//=>give values in postman body
// {
// 	"ename":"abc",
// 	"eaddr":"def"
// }
//Update Record In Database
app.put('/emp/update/:eid', function (req, res) {
    mysqlConnection.query("UPDATE EMP SET ename='" + req.body.ename+ "',eaddr='" + req.body.eaddr+ "' WHERE eid='" + req.body.eid+ "'",function(err, results){
        if (!err){
            res.status(200).send("Updated Successfully")
        }
        else{
            res.status(404).send(err)
        }
    })
})
//=>give values in postman body
// {
// 	"eid":4,
// 	"ename":"abc",
// 	"eaddr":"def"
// }
//Delete Record In Database
app.delete('/emp/delete/:id', function (req, res) {
   mysqlConnection.query("DELETE FROM EMP WHERE EID="+req.body.eid+"",function(err, results){
        if (!err){
            res.status(200).send("Deleted Successfully")
        }
        else{
            console.log(err)
            // res.status(404).send(err)
        }
    });
});

// =>give values in postman body
// {
// 	"eid":4
// }
//URL: http://localhost:8080/emp/delete/:4


