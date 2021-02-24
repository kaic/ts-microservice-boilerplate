import './module.alias'

import { AddressInfo } from 'net'
import logger from '@config/logger'
import { HTTPServer } from '@bin/httpServer'

const appInstance = new HTTPServer()
const serverAddress = appInstance.server.address() as AddressInfo

logger.info(`App is running on port: ${serverAddress.port} in ${process.env.NODE_ENV}`)
