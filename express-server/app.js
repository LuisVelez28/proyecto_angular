var express = require('express'), cors = require('cors');
var app = express();
app.use(cors());
app.use(express.json());
app.listen(3000, () => console.log('Server running on port 3000'));

const ciudades = ["Paris, France", "New York, USA", "Tokyo, Japan", "Sydney, Australia", "Rio de Janeiro, Brazil", "Barcelona, Spain", "Cape Town, South Africa", "Moscow, Russia", "Dubai, UAE", "Rome, Italy"];
app.get("/ciudades", (req, res, next) => {
  const q = (req.query.q || '').toString().trim().toLowerCase();
  if (!q) {
    return res.json(ciudades);
  }
  return res.json(ciudades.filter(c => c.toLowerCase().includes(q)));
});

var misdestinos = [];
app.get("/mydestinos", (req, res, next) => res.json(misdestinos));
app.post("/mydestinos", (req, res, next) => {
  console.log(req.body);
  misdestinos.push(req.body.nuevo);
  res.json(misdestinos);
});
