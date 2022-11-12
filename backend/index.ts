import express from 'express'
import { type Handler } from 'vite-plugin-mix'
import { Todo } from '../lib'
import { env } from './env'
import Game from './game'
import OSM from './osm'
const osm = new OSM()

// Notice how SECRET, from `.env` is loaded like this.
console.log(`Secret: ${env.SECRET}, hostname: ${env.HOSTNAME}`)

const app = express()

app.get('/api/game', async (req, res) => {
  const pad = 0.04
  const game = new Game()
  
  const bounds = {
    left: Math.min(game.to.lat, game.to.lat) - pad,
    right: Math.max(game.to.lat, game.to.lat) + pad,
    top: Math.min(game.to.lon, game.to.lon) - pad,
    bottom: Math.max(game.to.lon, game.to.lon) + pad
  }

  const map = await osm.map(bounds)

  return res.send(map)
})

app.get('/api/todos', async (req, res) => {
  const { id } = req.query

  if (id) {
    const ftch = await fetch(
      ' https://jsonplaceholder.typicode.com/todos/' + id
    )

    const json = (await ftch.json()) as Todo
    return res.json([json])
  } else {
    const ftch = await fetch(' https://jsonplaceholder.typicode.com/todos')
    const json = (await ftch.json()) as Todo[]
    return res.json(json)
  }
})

// Only serve index.html in production.
// In development, a dev server is provided by vite and only the backend API
// from this script is used.
if (env.NODE_ENV?.match(/prod/i)) {
  app.listen(env.PORT)
  console.log(`listening at *:${env.PORT}`)
}

export const handler: Handler = app
