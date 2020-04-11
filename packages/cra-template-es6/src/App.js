import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

// Create global app object
const app = express();

// Serve images, CSS files, HTML and JavaScript files in a directory named public.
app.use('/static', express.static(path.join(__dirname, '../public')));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.redirect('/static/index.html');
});

var server = app.listen(process.env.PORT || 4200, () => {
  console.log('Listening on port ' + server.address().port);
});
