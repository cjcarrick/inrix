import { Location } from '../lib'
import locations from './locations'

export default class Round {
  from: Location
  to: Location

  constructor(public id: number) {
    this.from = locations[Math.floor(Math.random() * 100)]
    this.to = locations[Math.floor(Math.random() * 100)]
  }
}
