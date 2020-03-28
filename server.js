const express = require('express')
const app = express()
const cors = require('cors')

const rooms = require('./routes/rooms')

app.use(cors())

const router = new express.Router();

router.use(rooms)

app
  .get('/', (req, res) => res.send('OK'))
  .use('/api/v1.0', router)

 
app.listen(3000)