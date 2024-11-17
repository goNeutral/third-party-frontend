import { atom } from 'jotai'

// In Jotai, we don't need to specify a key, and we just pass the default value directly
export const userAuthAtom = atom<AuthState>({
  isAuthenticated: false,
  user: null,
  loading: true,
})