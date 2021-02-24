import path from 'path'
import { sync } from 'glob'
import { Server } from 'http'
import express from 'express'

import env from '@config/env'
import app from '@config/express'
import logger from '@config/logger'

export class HTTPServer {
  public server: Server = null
  public static app: express.Express = app

  constructor () {
    this.initializeRouters()

    this.server = app.get('server')
    if (process.env.NODE_ENV !== 'test') this.server.listen(env.port)

    process.on('uncaughtException', (err) => logger.error('Uncaught Exception', err))
    process.on('SIGTERM', this.shutdown)
    process.on('SIGINT', this.shutdown)
  }

  private shutdown (): void {
    logger.info('Starting Shutdown', { date: new Date().toISOString() })

    if (this.server?.listening) this.server.close()

    logger.info('Goodbye!', { date: new Date().toISOString() })

    process.exit(0)
  }

  private initializeRouters (): void {
    logger.info('Initializing routes')

    const routesGlob = path.join(process.cwd(), 'src', '/**/*.api.{js,ts}')
    const routes = sync(routesGlob)

    routes.forEach((routePath: string) => {
      require(path.resolve(routePath))
      logger.info('Route setup', { routePath })
    })
  }
}
