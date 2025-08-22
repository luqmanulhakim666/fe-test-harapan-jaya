export interface Address {
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
  address: { city: string }
}
