export interface Address {
  currentAddress: string
  city: string
}
export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  address: Address
}
export interface NewUserPayload {
  name: string
  username: string
  email: string
  phone: string
  address: {
    currentAddress: string
    city: string
  }
}
