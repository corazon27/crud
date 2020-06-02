var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json({type: 'application/json'}));
// support URL-encode body
app.use(bodyParser.urlencoded({extended: true}));

var con = mysql.createConnection ({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'mobpro'
});

var server = app.listen(8080, function(){
	var host = server.address().address
	var port = server.address.port
	
	console.log("server start");
});

con.connect(function(error){
	if(!!error)console.log('error');
	else console.log('connected');
});

app.get('/', (req, res)=>res.send("Hello World"))

app.get('/users',function(req, res){
	con.query('SELECT * FROM users',function(error, rows, fields){
		if(!!error)console.log('error');
		else{
			console.log(rows);
			res.send(rows);
		}
	});
})

app.post('/users', function(req, res){
	con.query('INSERT INTO users set ?', req.body, function(error, rows, fields){
		if(!!error)console.log('error');
		else{
			console.log(rows);
			res.send(JSON.stringify(rows));
		}
	})
})

app.get('/users/:id', function(req, res){
	console.log(req.params.id);
	con.query('SELECT * FROM users where id=?', req.params.id, function(error, rows, fields){
		if(!!error)console.log('error');
		else{
			console.log(rows);
			res.send(JSON.stringify(rows));
		}
	})
})

app.delete('/users/:id', function(req, res){
	console.log(req.params.id);
	con.query('DELETE FROM users where id=?', req.params.id, function(error, rows, fields){
		if(!!error)console.log('error');
		else{
			console.log(rows);
			res.send('delete success!');
		}
	})
})

app.put('/users', function(req, res){
	con.query('UPDATE users SET mhs_nama=?, mhs_kelas=?, mhs_email=?, mhs_no_hp=?', [req.body.mhs_nama, req.body.mhs_kelas, req.body.mhs_email, req.body.mhs_no_hp, req.body.id], function(error, rows, fields){
		if(error) throw error;
		else{
			console.log(rows);
			res.end(JSON.stringify(rows));
		}
	})
})