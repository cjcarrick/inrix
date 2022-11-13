import { Coordinates } from '../lib'

const arr: Coordinates[] = []

for (let i = 0; i < 100; i++) {
  arr.push({
    lat: Math.random() * 0.054334 + 37.730666,
    lon: Math.random() * 0.11534 - 122.50489
  })
}

export default arr
