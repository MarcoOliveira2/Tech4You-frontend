const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(dirname + '/dist/Tech4You-frontend'));
app.get('/*', function(req,res) {
res.sendFile(path.join(dirname+
'/dist/Tech4You-frontend/index.html'));});
app.listen(process.env.PORT || 8080);