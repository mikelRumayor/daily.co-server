const router = require('express').Router()
const rest = require('../providers/rest');

const tranform = ({ id, name, ...room}) => ({ ...room, id: name, name }) 

router
  .get('/rooms', async (req, res) => {
    try {
      const { data: rooms } = await rest.read('/rooms')
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify(rooms.map(tranform), null, 2))
    } catch(e) {
      console.log(e)
      res.status(500)
    }
  })
  .post('/rooms', async (req, res) => {
    try {
      const room = await rest.create('/rooms', req.body)
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify(tranform(room), null, 2))
    } catch(e) {
      res.status(500)
    }
  })
  .get('/rooms/token', async (req, res) => {
    try {
      const { data: rooms } = await rest.read('/meeting-tokens/token')
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify(rooms.map(tranform), null, 2))
    } catch(e) {
      res.status(500)
    }
  })
  .get('/rooms/:id', async ({ params : { id }}, res) => {
    try {
      const room = await rest.read(`/rooms/${id}`)
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify(tranform(room), null, 2))
    } catch(e) {
      res.status(500)
    }
  })

  module.exports = router;