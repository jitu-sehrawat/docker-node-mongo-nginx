const express = require('express');
const app = express();

app.get(`/`, (req, res) => {
  res.send(`<h2>Hi There !!!<h2/> ${process.env.NODE_ENV}`)
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));