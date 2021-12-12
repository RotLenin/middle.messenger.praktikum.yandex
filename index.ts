var express = require('express');
var app = express();
const path = require('path')

const PORT = 3000

app.use(express.static('dist'));

//Стартовая страница
app.get('*', function(req, res) {
    res.status(200).sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
