import type { Directions } from 'lib'

export async function getTimes(directions: Directions[], money: number) {
  const req = await fetch('/api/directions', {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ directions, money })
  })

  return (await req.json()) as Required<Directions>[]
}
