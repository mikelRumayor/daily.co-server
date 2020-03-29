const router = require('express').Router()
const database = require('../providers/database')

router
  .post('/stats/:id', async (req, res) => {
    const { params: { id }} = req;
    const { body: {
      timestamp,
      videoRecvBitsPerSecond,
      videoSendBitsPerSecond,
      videoRecvPacketLoss,
      videoSendPacketLoss
     } } = req
    
    try {
      await database.writePoints([
        {
          measurement: 'metrics',
          tags: { id },
          fields: {
            timestamp,
            videoRecvBitsPerSecond,
            videoSendBitsPerSecond,
            videoRecvPacketLoss,
            videoSendPacketLoss
           },
        }
      ])
      
      const [first] = await database.query(`
        select * from metrics
        order by time desc
        limit 1
      `)
      res.header("Content-Type",'application/json');
      res.json(first)

    } catch(e) {
      console.log(e)
      res.status(500)
    }
  })
  


  module.exports = router;