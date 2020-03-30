const Influx = require('influx');

module.exports = {
  measurement: 'metrics',
  fields: {
    videoRecvBitsPerSecond: Influx.FieldType.FLOAT,
    videoSendBitsPerSecond: Influx.FieldType.FLOAT,
    videoRecvPacketLoss: Influx.FieldType.INTEGER,
    videoSendPacketLoss: Influx.FieldType.INTEGER,
  },
  tags: ['id', 'participantId']
}