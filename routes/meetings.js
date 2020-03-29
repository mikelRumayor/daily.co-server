const router = require('express').Router()
const rest = require('../providers/rest');

router
  .get('/meetings/:token', async (req, res) => {
    const { token } = req.params;
    try {
      await rest.read(`/meeting-tokens/${token}`)
      res.send(JSON.stringify({ valid: true }, null, 2))
    } catch(e) {
      res.send(JSON.stringify({ valid: false }, null, 2))
    }
  })
  .post('/meetings', async (req, res) => {
    const { body: { name }} = req;

    try {
      const { token } = await rest.create('/meeting-tokens', {properties: { room_name: name }})
      res.send(token)
    } catch(e) {
      console.log(e)

      res.status(500)
    }
  })

  module.exports = router;