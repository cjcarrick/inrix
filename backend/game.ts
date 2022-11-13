import { Coordinates } from '../lib'
import { arr } from './locations'
import { Location } from '../lib'
import Round from './round'
 
export default class Game {
  from: Location
  to: Location
  id: number
  
  constructor() {
    var money = 0;
    this.id = Math.floor(Math.random() * 1000)
  }

  public advance(){
    new Round()
  }
}

