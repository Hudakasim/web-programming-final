var mysql = require('mysql');
const express = require('express');
const app = express();
var path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Narin.78",
	database: "HudaKasimoglu"
});

con.connect(function(err) {
    if (err) throw err;
    console.log('Connected!!!');
});

app.get('/anasayfa', (req, res) => {
let kosul = req.query.kosul || '';
	let sql = "SELECT * from HudaKasimoglu.ilceler where ilce_adi = '"+ kosul +"';";
	con.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);

		res.render('anasayfa', { data: result, kosul: kosul });
	});
})


let port = 7088;
app.listen(port, (err)=>{
	if(err) throw err;
	console.log("dinleniyor");
});

