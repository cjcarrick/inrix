import { Location } from '../lib'
import Player from './player'
import Round from './round'

export default class Game {
  from: Location
  to: Location
  id: number
  players: Player[]
  rounds: Round[]
  round: number

  constructor(private startingCash = 10, private numRounds = 3) {
    this.id = Math.floor(Math.random() * 1000)
    this.players = []
    this.round = 1

    for (let i = 1; i <= this.numRounds; i++) {
      this.rounds.push(new Round(i))
    }
  }

  addPlayer = () => {
    const player = new Player(this.startingCash)
    this.players.push(player)
  }

  private finish = () => {
    console.log('done')
  }

  public advance() {
    if (this.round == this.numRounds) {
      this.finish()
    } else {
      this.round++
      return this.rounds[this.round]
    }
  }
}
