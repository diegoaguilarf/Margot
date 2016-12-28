var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(3000, function (err) {
	if (err) return console.log('Hubo un error'), process.exit(1);

	console.log('Servidor escuchando en el puerto 3000');
});