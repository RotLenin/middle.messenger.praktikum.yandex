var express = require('express');
var app = express();
const path = require('path');

const PORT = 3000;
const HOST = '0.0.0.0';
/** Возможность прокидывания порта из CLI */
const port = process.env.PORT || PORT;
const host = process.env.IP || HOST;

app.use(express.static('dist'));

//Стартовая страница
// @ts-ignore
app.get('*', function(req, res) {
    res.status(200).sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port, host, () => console.log(`Server started on port ${port}`));
