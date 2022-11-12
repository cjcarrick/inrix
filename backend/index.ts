import express from 'express'
import { type Handler } from 'vite-plugin-mix'
import { NewGameData } from '../lib'
import { env } from './env'
import Game from './game'
import Inrix from './inrix'

const games: { [id: string]: Game } = {}
const inrix = new Inrix(env.APPID, env.HASHTOKEN)
const app = express()

app.get('/api/newGame', async (req, res) => {
  const game = new Game()

  games[game.id.toString()] = game

  return {
    gameId: game.id,
    from: game.from,
    to: game.to
  } as NewGameData
})

app.get('/api/gameResults', async (req, res) => {
  const { gameId, chosenRoute } = req.query
  if (!id) {
    return res.sendStatus(400)
  }

  const game = games[id.toString()]
  if (!game) {
    return res.status(500)
  }

  const dat = await inrix.findRoute(game.from, game.to)
  return res.json(dat)
})

// Only serve index.html in production.
// In development, a dev server is provided by vite and only the backend API
// from this script is used.
if (env.NODE_ENV?.match(/prod/i)) {
  app.listen(env.PORT)
  console.log(`listening at *:${env.PORT}`)
}

export const handler: Handler = app
