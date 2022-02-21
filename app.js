const express = require('express');
const session = require('express-session');
const redis = require('redis');
const redisClient = redis.createClient();
const redisStore = require('connect-redis')(session);

const app = express();

app.get('/', function (req, res) {
  res.send('Phani Simple web page to see how the session works!');
});

app.listen(3000, function () {
  console.log('Phani simple app listening on port 3000!');
});

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

redisClient.on('connect', function() {
  console.log('Connected!');
});

app.use(session({
  secret: 'PhaniSessionStorageSecretKey',
  name: '_phaniredis',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
}));