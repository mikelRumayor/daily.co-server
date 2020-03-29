const Influx = require('influx');

const model = require('../models/metrics')

const database = new Influx.InfluxDB({
  database: process.env.DATABASE_NAME,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.DATABASE_URL,
  port: process.env.DATABASE_PORT,
  url: process.env.DATABASE_URL,
  token: process.env.TOKEN,
  schema: [model]
})

database.getDatabaseNames()
.then(names => {
  if (!names.includes(process.env.DATABASE)) {
    return database.createDatabase(process.env.DATABASE);
  }
})



module.exports = database

