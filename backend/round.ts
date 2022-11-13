import { Coordinates } from '../lib'
import { arr } from './locations'
import { Location } from '../lib'
 
export default class Round {
  from: Location
  to: Location
  constructor() {
    this.setLocations()
  }

  private setLocations = () => {
    this.from = arr[Math.floor(Math.random() * 100)]
    this.to = arr[Math.floor(Math.random() * 100)]
  }
}