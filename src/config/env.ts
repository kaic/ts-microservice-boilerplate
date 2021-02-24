export default {
  app: {
    title: process.env.APP_TITLE,
    description: process.env.APP_DESCRIPTION
  },
  baseUrl: process.env.BASE_URL ?? '/v1',
  port: process.env.PORT
}
