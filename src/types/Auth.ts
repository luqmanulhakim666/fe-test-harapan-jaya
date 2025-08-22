// types/Auth.ts
export interface LoginResponse {
  accessToken: string
  refreshToken: string
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}

export interface LoginPayload {
  username: string
  password: string
}
