export type Coordinates = {
  lat: number
  lon: number
}

export type RideShareData = {
  timeToGetHere: number
  cost: number
  location: Location
}

export type Segment = { from: Coordinates; to: Coordinates }

export type BusData = {
  name: string
  lat: number
  lon: number
  atStreet: string
  onStreet: string
}

export type TransportTypes = 'bus' | 'walk' | 'drive'
export type Directions = {
  type: TransportTypes
  from: Coordinates
  to: Coordinates

  /** Undefined if the server hasn't determined the steps */
  steps?: Coordinates[]
  /** Undefined if the server hasn't determined the time */
  minutes?: number
}

export type Location = Coordinates

export type NewGameData = {
  from: Location
  to: Location
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
