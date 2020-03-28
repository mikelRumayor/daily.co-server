const router = require('express').Router()
const axios = require('axios');

const API_KEY = process.env.API_KEY

router
  .get('/rooms', async (req, res) => {
    try {
      const { data: { data: rooms }} = await axios.get('https://api.daily.co/v1/rooms', {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      })
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify(rooms, null, 2))
    } catch(e) {
      res.status(500)
    }
  })
  .post('/rooms', async (req, res) => {
    try {
      const { data: room } = await axios.post('https://api.daily.co/v1/rooms', req.body, {
        headers: {
        'Authorization': `Bearer ${API_KEY}`
          }
        })
      room = {...room, id: room.name }
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify(room, null, 2))
    } catch(e) {
      res.status(500)
    }
  })
  .get('/rooms/:id', async ({ params : { id }} , res) => {
    try {
      const { data: room } = await axios.get(`https://api.daily.co/v1/rooms/${id}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      })
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify(room, null, 2))
    } catch(e) {
      res.status(500)
    }
  })

  module.exports = router;