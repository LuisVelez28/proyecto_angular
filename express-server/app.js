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

var trackingEvents = [];
var trackingRouter = express.Router();
trackingRouter.get('/', (req, res, next) => res.json(trackingEvents));
trackingRouter.post('/', (req, res, next) => {
  const payload = req.body || {};
  trackingEvents.push({
    timestamp: payload.timestamp || new Date().toISOString(),
    trackingTagsCount: payload.trackingTagsCount || {}
  });
  res.status(201).json({ ok: true, total: trackingEvents.length });
});
app.use('/tracking-tags', trackingRouter);

const translations = {
  es: {
    APP_TITLE: '✈️ Wishlist',
    APP_SUBTITLE: 'Descubre los mejores destinos',
    NAV_DESTINOS: 'Mis destinos',
    NAV_VUELOS: 'Vuelos',
    NAV_RESERVAS: 'Reservas',
    NAV_LOGIN: 'Login',
    FOOTER: '2026 Wishlist de Viajes. Todos los derechos reservados.',
    HOLA: 'Hola'
  },
  en: {
    APP_TITLE: '✈️ Wishlist',
    APP_SUBTITLE: 'Discover the best destinations',
    NAV_DESTINOS: 'My destinations',
    NAV_VUELOS: 'Flights',
    NAV_RESERVAS: 'Bookings',
    NAV_LOGIN: 'Login',
    FOOTER: '2026 Travel Wishlist. All rights reserved.',
    HOLA: 'Hello'
  },
  fr: {
    APP_TITLE: '✈️ Wishlist',
    APP_SUBTITLE: 'Découvrez les meilleures destinations',
    NAV_DESTINOS: 'Mes destinations',
    NAV_VUELOS: 'Vols',
    NAV_RESERVAS: 'Réservations',
    NAV_LOGIN: 'Connexion',
    FOOTER: '2026 Liste de voyages. Tous droits réservés.',
    HOLA: 'Bonjour'
  }
};

app.get("/api/translation", (req, res, next) => {
  const lang = (req.query.lang || 'es').toString();
  const dict = translations[lang] || translations['es'];
  const result = Object.entries(dict).map(([key, value]) => ({ lang, key, value }));
  res.json(result);
});
