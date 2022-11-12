import { Location, locations } from './locations'

export default class Game {
  from: Location
  to: Location
  id: number

  constructor() {
    this.id = Math.floor(Math.random() * 1000)
    this.setLocations()
  }

  private setLocations = () => {
    this.from = locations[0]
    this.to = locations[1]
  }
}
