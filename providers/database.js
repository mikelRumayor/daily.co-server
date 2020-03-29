const Influx = require('influx');

const model = require('../models/metrics')

const database = new Influx.InfluxDB({
  database: process.env.DATABASE,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  schema: [model]
})

database.getDatabaseNames()
.then(names => {
  if (!names.includes(process.env.DATABASE)) {
    return database.createDatabase(process.env.DATABASE);
  }
})

module.exports = database

