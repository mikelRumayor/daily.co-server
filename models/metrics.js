const Influx = require('influx');

module.exports = {
  measurement: 'metrics',
  fields: {
    timestamp: Influx.FieldType.INTEGER,
    videoRecvBitsPerSecond: Influx.FieldType.FLOAT,
    videoSendBitsPerSecond: Influx.FieldType.FLOAT,
    videoRecvPacketLoss: Influx.FieldType.INTEGER,
    videoSendPacketLoss: Influx.FieldType.INTEGER,
  },
  tags: ['id']
}