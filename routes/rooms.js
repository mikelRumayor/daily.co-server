const router = require('express').Router()
const axios = require('axios');

const API_KEY = process.env.API_KEY

router
  .get('/rooms', async (req, res) => {
    const { data: { data: rooms }} = await axios.get('https://api.daily.co/v1/rooms', {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    })
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(rooms, null, 2))
  })



  module.exports = router;