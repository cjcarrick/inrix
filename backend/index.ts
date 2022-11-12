import express from 'express'
import { type Handler } from 'vite-plugin-mix'
import {
  BusDirections,
  DriveDirections,
  NewGameData,
  WalkingDirections
} from '../lib'
import busStops from '../lib/Muni_Stops.json'
import { env } from './env'
import Game from './game'
import Inrix from './inrix'

const games: { [id: string]: Game } = {}
const inrix = new Inrix(env.APPID, env.HASHTOKEN)
const app = express()

app.get('/api/busStations', (req, res) => {
  const mapped = busStops.map(a => ({
    name: a.STOPNAME,
    lat: a.LATITUDE,
    lon: a.LONGITUDE,
    atStreet: a.ATSTREET,
    onStreet: a.ONSTREET
  }))
  return res.json(mapped)
})

app.get('/api/newGame', async (req, res) => {
  const game = new Game()

  games[game.id.toString()] = game

  return {
    gameId: game.id,
    from: game.from,
    to: game.to
  } as NewGameData
})

app.get('/api/endRound', async (req, res) => {
  // TODO: app.use(express.json()) causes mix server to hang
  const segments = req.body as (
    | DriveDirections
    | BusDirections
    | WalkingDirections
  )[]

  for (let i = 0, len = segments.length; i < len; i++) {
    const segment = segments[i]
    const travel = await inrix.findRoute(segment.from, segment.to)
    if (segment.type == 'bus') {
      return travel.result.trip.routes[0].uncongestedTravelTimeMinutes
    } else if (segment.type == 'walk') {
      return travel.result.trip.routes[0].travelTimeMinutes
    }
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
