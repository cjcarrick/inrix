export type Box = { left: number; top: number; right: number; bottom: number }

export default class OSM {
  private basename = 'https://api.openstreetmap.org/api/0.6/'

  constructor() {
    //
  }

  map = async (bbox: Box) => {
    const { left, top, right, bottom } = bbox

    const req = await fetch(
      this.basename + `/map?bbox=${left},${bottom},${right},${top}`
    )

    console.log(await req.text())
    console.log(req.statusText)
    return await req.json()
  }
}
