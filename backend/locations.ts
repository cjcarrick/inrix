import { Coordinates } from "../lib";

let arr: Coordinates[] = []

for (let i = 0; i < 100; i++) {
  arr.push({
    lat: Math.random() * 0.054334 + 37.730666,
    lon: Math.random() * 0.11534 - 122.504890
  })
}

export { arr }