export type Coordinates = {
  lat: number
  lon: number
}

export type Location = Coordinates & {
  name: string
  lat: number
  lon: number
}

export type NewGameData = {
  from: Coordinates
  to: Coordinates
  gameId: number
}

export type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

export type GameStart = {
  from: Location
  to: Location
  maptiles: string[][]
}

export type GameResults = {}
