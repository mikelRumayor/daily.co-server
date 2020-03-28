const router = require('express').Router()
const rest = require('../providers/rest');

router
  .get('/rooms', async (req, res) => {
    try {
      const { data: rooms } = await rest.read('/rooms')
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify(rooms, null, 2))
    } catch(e) {
      res.status(500)
    }
  })
  .post('/rooms', async (req, res) => {
    try {
      let room = await rest.create('/rooms', req.body)
      room = {...room, id: room.name }
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify(room, null, 2))
    } catch(e) {
      res.status(500)
    }
  })
  .get('/rooms/:id', async ({ params : { id }}, res) => {
    try {
      const room = await rest.read(`/rooms/${id}`)
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify(room, null, 2))
    } catch(e) {
      res.status(500)
    }
  })

  module.exports = router;