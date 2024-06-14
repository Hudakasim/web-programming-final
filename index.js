var mysql = require('mysql');
const express = require('express');
const app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

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

app.get("/", function(req, res){
	res.redirect("/anasayfa");
});

app.get('/anasayfa', (req, res) => {
	let kosul = req.query.kosul || '';
	let sql = "SELECT * from HudaKasimoglu.ilceler";
	if(kosul){
		sql += " where ilce_adi LIKE '%"+ kosul +"%';"
	}
	con.query(sql, (err, result) => {
		if (err) throw err;
		else{
			console.log(result);
			res.render("main", {bilgiler: result, kosul: kosul ,page: 'anasayfa'});
		}
	});
});

app.get('/iletisim', (req, res) => {
	let nesne = {
		name: req.query.ad || '',
		surname: req.query.soyad || '',
		city: req.query.sehir || '',
		subject: req.query.konu || ''
	};
	console.log(`Ad: ${nesne.name}, Soyad: ${nesne.surname}, Şehir: ${nesne.city}, Konu: ${nesne.subject}`);
	res.render("main", {page: 'iletisim'});
});

let port = 7088;
app.listen(port, (err)=>{
	if(err) throw err;
	console.log("dinleniyor");
});

