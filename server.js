const express = require("express");
const cookieParser = require('cookie-parser');
const path = require("path");
const render = require('./app/index').renderServerSideHTML;
const app = express();

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "dist")));

app.get('**', async (req, res) => {
  const rendered = await render(req, res);
  res.send(rendered)
});

/* Temporary methods */
app.post('/login', (req, res) => {
  const token = 'df7!8fd23#rhF34^Ku$2fr298qw23ed65jf45v*&cJS2f';
  res.cookie('token', token, { maxAge: 900000, httpOnly: true });
  res.send({token})
});

app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.sendStatus(200)
});
/* */

app.listen(4000);
