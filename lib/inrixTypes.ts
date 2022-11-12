export type Auth = {
  copyright: string
  versionNumber: string
  createdDate: string
  responseId: string
  result: {
    token: string
    expiry: string
  }
}

export type ParkingOffStreet = {
  copyright: string
  versionNumber: string
  createdDate: 'yyyy-mm-ddThh:mm:ssZ'
  result: [
    {
      paymentIDs: []
      spacesTotal: number
      operator: string
      navigationAddress: {
        street: string
        city: string
        state: string
        postal: string
        country: string
        type: string
      }
      name: string
      pois: []
      rateCard: string
      type: string
      peps: {
        pepPt: [number, number]
        pepAz: number
        pepPrimary: boolean
        pepType: string
      }[]
      url: string
      hrs: [string, string]
      costIndex: number
      occupancy: {
        probability: number
        pct: number
        rank: number
        bucket: number
        available: null
      }
      note: string
      lotCategory: string
      reservations: []
      id: number
      currencyIso: string
      phone: string
      ev_chargers: {
        site_code: string
        names: {
          name: string
          locale: string
        }[]
        display_point: {
          coordinates: {
            latitude: number
            longitude: number
          }
        }
        ports: {
          connector_type: string
          id: string
          voltage_volt: string
          current_amps: string
          level: string
          power_kw: string
        }[]
        manufacturer: string
        network: string
        reservable: boolean
      }[]
      amenities: (
        | {
            id: number
            name: string
            value: number
            metric: number
          }
        | {
            id: number
            name: string
            value: boolean
          }
      )[]
      format: string
      currency: string
      pmtTypes: string[]
      handicapSpacesTotal: number
      buildingAddress: {
        street: string
        city: string
        state: string
        postal: string
        country: string
        type: string
      }
      point: {
        type: string
        coordinates: [number, number]
      }
      polygon: string
      phones: {
        type: string
        number: number
      }[]
      calculatedRates: null
      isOpen: null
      tz: string
    }
  ]
}

export type FindRoute = {
  docType: string
  copyright: string
  versionNumber: string
  createdDate: string
  statusId: number
  statusText: string
  responseId: string
  result: {
    trip: {
      tripId: string
      wayPoints: {
        id: number
        geometry: { type: 'Point'; coordinates: [[number, number]] }
      }[]
      routes: {
        uncongestedTravelTimeMinutes: number
        routeQuality: number
        id: number
        hasClosures: boolean
        travelTimeMinutes: number
        abnormalityMinutes: number
        averageSpeed: number
        statusId: number
        totalDistance: string
        routeTransportStatus: number
        summary: {
          text: string
          roads: { roadClass: number; name: string }[]
        }
        description: string
        boundingBox: {
          corner1: {
            type: 'Point'
            coordinates: [[number, number]]
          }
          corner2: {
            type: 'Point'
            coordinates: [[number, number]]
          }
        }
      }[]
    }
  }
}
