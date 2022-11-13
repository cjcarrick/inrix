import qs from 'qs'
import { Coordinates } from '../lib'
import { Auth, FindRoute } from '../lib/inrixTypes'

export default class Inrix {
  private basename = 'https://api.iq.inrix.com'
  private bearer: { token: string; expires: Date } | undefined = undefined

  constructor(private appId: string, private hashToken: string) {
    //
  }

  authenticated = () => {
    if (!this.bearer) return false

    if (this.bearer.expires.getTime() < new Date().getTime()) {
      this.bearer = undefined
      return false
    }

    return true
  }

  private auth = async () => {
    const params = { appId: this.appId, hashToken: this.hashToken }
    const req = await fetch(
      this.basename + `/auth/v1/appToken?` + qs.stringify(params)
    )

    const json = (await req.json()) as Auth

    this.bearer = {
      token: json.result.token,
      expires: new Date(json.result.expiry)
    }
  }

  private fetcher = async (
    endpoint: string,
    params: { [key: string]: string }
  ) => {
    if (!this.authenticated() || !this.bearer) {
      await this.auth()
    }

    const req = await fetch(
      this.basename + endpoint + '?' + qs.stringify(params, { encode: false }),
      {
        headers: {
          Authorization: `Bearer ${this.bearer!.token}`,
          accept: 'application/json'
        }
      }
    )

    console.log(req.url, req.status, req.statusText)
    // If auth expired try again
    if (req.status == 401) {
      console.log('expired')
      await this.auth()
      return await this.fetcher(endpoint, params)
    }

    const json = await req.json()
    return json
  }

  findRoute = async (from: Coordinates, to: Coordinates) => {
    const params = {
      wp_1: `${from.lat}%2C${from.lon}`,
      wp_2: `${to.lat}%2C${to.lon}`,
      format: 'json'
    }
    const json = await this.fetcher(`/findRoute`, params)
    return json as FindRoute
  }

  findOnStreetParking = async (location: Coordinates, radius = 150) => {
    const params = {
      radius: radius.toString(),
      point: `${location.lat}%2C${location.lon}`
    }
    const json = await this.fetcher('/lots/v3', params)
    return json
  }
}
