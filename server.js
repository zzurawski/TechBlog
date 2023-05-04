const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require('./config/config.js');
const SequelizeStored = require('connect-session-sequelize')(session.Store);

const sesh = {
  secret: 'secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStored({
    db: sequelize
  })
};

app.use(session(sesh));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.authenticate().then(() => {
  console.log('Connection Success');
  return sequelize.sync({force: false});
}).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on ${PORT}!`);
  });
}).catch(error => {
  console.error('Unable to connect', error);
});