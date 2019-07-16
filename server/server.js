const express = require('express');
const app = express();

const port = process.env.PORT || 9000;

app.listen(port, () => console.log('sever listening on port 9000'));

// only for production on heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('../client', 'build', 'index.html'));
  });
}

module.exports = app;
