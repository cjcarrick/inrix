import express from 'express'
import { type Handler } from 'vite-plugin-mix'
import {
  BusData,
  Coordinates,
  Directions,
  NewGameData,
  RideShareData
} from '../lib'
import busStops from '../lib/Muni_Stops.json'
import { env } from './env'
import Game from './game'
import Inrix from './inrix'

const games: { [id: string]: Game } = {}
const inrix = new Inrix(env.APPID, env.HASHTOKEN)
const app = express()

app.get('/api/busStations', (req, res) => {
  var mapped = busStops.map(
    a =>
      ({
        name: a.STOPNAME,
        lat: a.LATITUDE,
        lon: a.LONGITUDE,
        atStreet: a.ATSTREET,
        onStreet: a.ONSTREET
      } as BusData)
  )
  mapped = mapped.filter((a, i) => {
    for (let j = 0; j < i; j++) {
      if (
        Math.abs(mapped[j].lat - a.lat) < 0.0035 &&
        Math.abs(mapped[j].lon - a.lon) < 0.0035
      )
        return false
    }
    return true
  })
  return res.json(mapped)
})

app.get('/api/newGame', async (req, res) => {
  const game = new Game()

  games[game.id.toString()] = game

  const json: NewGameData = {
    gameId: game.id,
    from: game.rounds[game.round].from,
    to: game.rounds[game.round].to
  }
  return res.json(json)
})

app.get('/api/rideshares', async (req, res) => {
  const { from, to } = req.query

  const fromObj = JSON.parse(
    decodeURIComponent(from?.toString() || '{}')
  ) as Coordinates

  const toObj = JSON.parse(
    decodeURIComponent(to?.toString() || '{}')
  ) as Coordinates

  console.log({ fromObj, toObj, from, to })

  if (!fromObj.lat || !fromObj.lon || !toObj.lat || !toObj.lon) {
    return res.sendStatus(400)
  }

  const route = (await inrix.findRoute(fromObj, toObj)).result.trip.routes[0]

  const rides: RideShareData[] = []
  const cost = 2 + 1 * parseFloat(route.totalDistance)

  for (let i = 0, len = Math.floor(8 * Math.random()); i < len; i++) {
    rides.push({
      cost,
      timeToGetHere: route.travelTimeMinutes,
      location: {
        lat: fromObj.lat - 0.001 + Math.random() / 0.002,
        lon: fromObj.lon - 0.001 + Math.random() / 0.002
      }
    })
  }

  return res.json(rides)
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

  // Return the next round to the website
  const round = game.advance()

  // And also return how they did this time

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

  return res.json({ directions, round })
})

// Only serve index.html in production.
// In development, a dev server is provided by vite and only the backend API
// from this script is used.
if (env.NODE_ENV?.match(/prod/i)) {
  app.listen(env.PORT)
  console.log(`listening at *:${env.PORT}`)
}

export const handler: Handler = app
