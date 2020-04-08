const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

require('./config/config.js')

const { createLogger, format, transports } = require('winston')
const logFormat = format.combine(
  format.colorize(),
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
)

const expressWinston = require('express-winston')

const logConfig = {
  format: logFormat,
  transports: [
    new transports.Console()
  ]
}
const logger = createLogger({
  level: gConfig.log,
  format: logConfig.format,
  defaultMeta: { service: 'user-service' },
  transports: logConfig.transports
})

global.logger = logger
const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(expressWinston.logger({
  transports: logConfig.transports,
  format: logConfig.format,
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  ignoreRoute: function (req, res) { return false } // optional: allows to skip some log messages based on request and/or response
}))

// global.logger = logger;
app.use('/api/v1', require('./routes/index'))
//app.use(require('./routes/index'))
module.exports = app
