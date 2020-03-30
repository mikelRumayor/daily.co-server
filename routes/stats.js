const Influx = require('influx');
const router = require('express').Router()
const database = require('../providers/database')

router
  .get('/stats/:id', async (req, res) => {
    const { params: { id }} = req;
    
    try {
      const records = await database.query(`
        select * from metrics
        where id = ${Influx.escape.stringLit(id)}
        order by time asc
      `)
      console.log(records)
      res.header("Content-Type",'application/json');
      res.json(records)
    } catch(e) {
      console.log(e)
      res.status(500)
    }
  })
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
            videoRecvBitsPerSecond,
            videoSendBitsPerSecond,
            videoRecvPacketLoss,
            videoSendPacketLoss
           },
           timestamp
        }
      ],{
        precision: 'ms',
      })
      
      const [first] = await database.query(`
        select * from metrics
        where id = ${Influx.escape.stringLit(id)}
        order by time desc
        limit 1
      `)
      res.header("Content-Type",'application/json');
      console.log(first)
      res.json(first)

    } catch(e) {
      console.log(e)
      res.status(500)
    }
  })
  
  


  module.exports = router;