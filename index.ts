var express = require('express');
var app = express();
const path = require('path');

const PORT = 3000;
/** Возможность прокидывания порта из CLI */
const port = process.env.PORT || PORT;

app.use(express.static('dist'));

//Стартовая страница
app.get('*', function(req, res) {
    res.status(200).sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => console.log(`Server started on port ${port}`))
