const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const database = require('./providers/database')


const rooms = require('./routes/rooms')
const stats = require('./routes/stats')

app.use(cors())
app.use(bodyParser.json())

const router = new express.Router();

router.use(rooms)
router.use(stats)

app
  .get('/', (req, res) => res.send('OK'))
  .use('/api/v1.0', router)

 
app.listen(3000)