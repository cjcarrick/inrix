import { Directions } from '../lib'

export default class Player {
  directions: Directions[]

  constructor(public cash: number) {
    //
    this.directions = []
  }

  addToRoute = (direction: Directions) => {
    this.directions.push(direction)
  }

  resetRoute = () => {
    this.directions = []
  }
}
