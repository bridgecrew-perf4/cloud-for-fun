const redis = require('redis')
const redisClient = redis.createClient()
const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.get('/:id', async (req, res) => {
  const id = req.params.id

  if (!id) {
    const statusCode = 406
    res.status(statusCode).send({
      message: 'identifier is missing from parameters',
      'http-code': statusCode,
    })
  }

  redisClient.get(id, (err, value) => {
    if (err) {
      throw err
    }
    res.redirect(value)
  })
})

app.post('/shorten', (req, res) => {
  const urlToShorten = req.query.url
  if (!urlToShorten) {
    const statusCode = 406
    res.status(statusCode).send({
      message: 'url parameter is missing from query',
      'http-code': statusCode,
    })
  }

  const randomID = Math.random().toString(36).substring(7)
  redisClient.set(randomID, urlToShorten, redis.print)
  res.status(201).send({ url: `http://localhost:3000/${randomID}` })
})

app.listen(port, () => {
  console.log(`server is listening on ${port}`)
})
