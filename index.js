var express = require('express');
var app = express();
const path = require('path')

const PORT = 3000

app.use(express.static('dist'));
/** TODO: Непонятная заглушка чтоб пройти тесты =))) */
app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
/**
//Стартовая страница
app.get('/', function(req, res) {
    res.status(200).sendFile(path.resolve(__dirname, 'dist', 'login.html'));
});
app.get('/index.html', function(req, res) {
    res.status(200).sendFile(path.resolve(__dirname, 'dist', 'login.html'));
});

//404
app.use(function(req,res){
    res.status(404).sendFile(path.resolve(__dirname, 'dist', '404.html'));
});

//500
app.use(function(error, req, res, next) {
    res.status(500).sendFile(path.resolve(__dirname, 'dist', '500.html'));
});
 */

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))