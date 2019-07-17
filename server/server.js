const express = require('express');
const app = express();

app.use('/', (req, res) => {
  res.send(
    "Heroku gets on my nerves so i'm going to burn the entire internet down. Lol"
  );
});

// only for production on heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('../client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 9000;

app.listen(port, () => console.log('sever listening on port 9000'));

module.exports = app;
