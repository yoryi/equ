export enum AddressComponentType {
  State = `administrative_area_level_1`,
  PostalCode = `postal_code`,
}

export interface SearchZipCodeResponse {
  results: {
    address_components: [
      {
        long_name: string
        short_name: string
        types: AddressComponentType[]
      },
    ]
    formatted_address: string
    geometry: {
      location: {
        lat: number
        lng: number
      }
    }
  }[]
}
