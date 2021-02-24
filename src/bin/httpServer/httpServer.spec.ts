import * as http from 'http'
import env from '@config/env'
import { agent } from 'supertest'
import { HTTPServer } from './httpServer'

let testServer: http.Server

beforeEach(async () => {
  const { server } = new HTTPServer()
  testServer = server
})

describe('Server module', () => {
  describe('when up', () => {
    test('should return 200 @ /', async () => {
      const statusEndpoint = `${env.baseUrl}`
      const response = await agent(HTTPServer.app).get(statusEndpoint)

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject({
        success: true,
        status: 'up',
        environment: 'test'
      })
    })
  })
})

afterEach(async () => {
  await testServer.close()
})
