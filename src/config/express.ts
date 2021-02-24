import http from 'http'
import xss from 'xss-clean'
import helmet from 'helmet'
import controller from 'express-power-router'
import express, { Request, Response, NextFunction } from 'express'

import env from '@config/env'
import logger from '@config/logger'

const app = express()

app.locals.title = env.app.title
app.locals.description = env.app.title

app.use(xss())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.disable('x-powered-by')

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

function sendLogs (req: Request, chunks: any, res: Response, start: number): void {
  const { originalUrl, headers, method, query, body } = req

  const response = Buffer.concat(chunks).toString('utf8')
  const { statusCode } = res
  const level = statusCode >= 400 ? 'error' : 'info'

  logger[level](response, {
    method,
    duration: Date.now() - start,
    statusCode,
    query,
    originalUrl,
    headers,
    requestData: JSON.stringify(body)
  })
}

const logMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now()
  const defaultWrite = res.write
  const defaultEnd = res.end
  const chunks: any = []

  res.write = (...restArgs: any[]) => {
    chunks.push(Buffer.from(restArgs[0]))
    defaultWrite.apply(res, restArgs)
    return true
  }

  res.end = (...restArgs: any[]) => {
    chunks.push(Buffer.from(restArgs[0]))

    sendLogs(req, chunks, res, start)

    defaultEnd.apply(res, restArgs)
  }

  next()
}

app.use(logMiddleware)
app.use(env.baseUrl, controller.router)

app.get(env.baseUrl, (req, res) => {
  res.send({
    status: 'up',
    success: true,
    environment: process.env.NODE_ENV,
    date: new Date()
  })
})

app.set('server', http.createServer(app))

export default app
