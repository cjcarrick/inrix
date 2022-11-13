export type Coordinates = {
  lat: number
  lon: number
}

export type Segment = { from: Coordinates; to: Coordinates }
export type TravelTime = Segment & { minutes: number }
export type DriveDirections = TravelTime & { type: 'drive' }
export type BusDirections = TravelTime & { type: 'bus' }
export type WalkingDirections = TravelTime & { type: 'walk' }
export type AllDirections = {
  bus: BusDirections
  walk: WalkingDirections
  drive: DriveDirections
}

export type Location = Coordinates;

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
