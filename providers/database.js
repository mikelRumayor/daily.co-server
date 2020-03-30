const Influx = require('influx');

const model = require('../models/metrics')

const database = new Influx.InfluxDB({
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  protocol: process.env.DATABASE_PROTOCOL,
  schema: [model]
})


database.getDatabaseNames()
.then(names => {
  console.log(names)
  if (!names.includes(process.env.DATABASE_NAME)) {
    return database.createDatabase(process.env.DATABASE_NAME);
  }
})



module.exports = database

