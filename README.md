# Daily.co/server

Backend of the project [Daily.co-metrics](https://github.com/mikelRumayor/daily.co-metrics).

## Features

- Room creation
- Public and private live calls creation
- Live calls metrics ingestion
- Rooms statistics per participants

## Requirements

- Node >= 12.13.0
- Npm >= 6.12.0
- Docker >= 19.03.2
- Docker-compose >= 1.24.1

## Installing

```bash
$ npm install
```

## Local development environment

Set up environment variables:

Create an .env file with the following enviorment variables.

```
  DATABASE_NAME=//name of the database
  DATABASE_USERNAME=influx //username of the database 
  DATABASE_PASSWORD=infux //password of the database 
  DATABASE_HOST=//host of the database
  DATABASE_PORT=8086//port of the database
  DATABASE_PROTOCOL=//protocol of the connection to the database
  API_URI=//Url to the API of Daily.co
  API_KEY=//Api Key of the Daily.co
  PORT=//port where the server is going to be deployed.
```

Navigate to docker-compose file and make changes so thaat the following variables are equal to the env file:
```
 INFLUXDB_USER and DATABASE_USERNAME have the same value
 INFLUXDB_USER_PASSWORD and DATABASE_PASSWORD have the same value
```


## Running locally

```bash
$ npm run dev
```

## Running in server

```bash
$ DATABASE_NAME=${...}, ... npm start
```
