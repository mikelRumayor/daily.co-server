const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const fallback = require('express-history-api-fallback');

const database = require('./providers/database')

const meetings = require('./routes/meetings')
const rooms = require('./routes/rooms')
const stats = require('./routes/stats')

app.use(cors())
app.use(bodyParser.json())

const router = new express.Router();

router.use(meetings)
router.use(rooms)
router.use(stats)

app.use('/api/v1.0', router)

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err);
});

app.use(express.static(__dirname + '/public'));
app.use(fallback('index.html', { root: __dirname + '/public' }))
app.listen(process.env.PORT)