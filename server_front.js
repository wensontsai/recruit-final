var express = require('express');
var app = express();

app.use(express.static(__dirname + '/server/static'));

app.listen(process.env.PORT || 8000);