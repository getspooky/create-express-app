import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

// Create global app object
const app = express();

// Set various HTTP headers to help protect your app.
app.use(helmet());

// set the view engine to ejs
app.set('view engine', 'ejs');

// Serve images, CSS files, HTML and JavaScript files in a directory named public.
app.use('/static', express.static(path.join(__dirname, '../public')));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.redirect('/static/index.html');
});

export default app;
