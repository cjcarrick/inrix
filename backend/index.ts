import express from 'express'
import { type Handler } from 'vite-plugin-mix'
import { BusData, Directions, NewGameData } from '../lib'
import busStops from '../lib/Muni_Stops.json'
import { env } from './env'
import Game from './game'
import Inrix from './inrix'

const games: { [id: string]: Game } = {}
const inrix = new Inrix(env.APPID, env.HASHTOKEN)
const app = express()

app.get('/api/busStations', (req, res) => {
  const mapped = busStops.map(
    a =>
      ({
        name: a.STOPNAME,
        lat: a.LATITUDE,
        lon: a.LONGITUDE,
        atStreet: a.ATSTREET,
        onStreet: a.ONSTREET
      } as BusData)
  )
  return res.json(mapped)
})

app.get('/api/newRound', async (req, res) => {
  const game = new Game()

  games[game.id.toString()] = game

  return {
    gameId: game.id,
    from: game.from,
    to: game.to
  } as NewGameData
})

app.get('/api/advance', async (req, res) => {
  const { id } = req.query

  const gameId = id?.toString()
  if (!gameId) {
    return res.sendStatus(500)
  }

  const game = games[gameId]
  if (!game) {
    return res.send(404)
  }

  game.advance()

  // TODO: app.use(express.json()) causes mix server to hang
  const directions = req.body as Directions[]

  for (let i = 0, len = directions.length; i < len; i++) {
    const direction = directions[i]
    const travel = await inrix.findRoute(direction.from, direction.to)

    if (direction.type == 'bus') {
      direction.minutes =
        travel.result.trip.routes[0].uncongestedTravelTimeMinutes
    } else if (direction.type == 'walk') {
      direction.minutes =
        parseFloat(travel.result.trip.routes[0].totalDistance) * 10
    } else if (direction.type == 'drive') {
      direction.minutes =
        travel.result.trip.routes[0].uncongestedTravelTimeMinutes / 3
    }
  }

  return res.json(directions)
})

// Only serve index.html in production.
// In development, a dev server is provided by vite and only the backend API
// from this script is used.
if (env.NODE_ENV?.match(/prod/i)) {
  app.listen(env.PORT)
  console.log(`listening at *:${env.PORT}`)
}

export const handler: Handler = app
