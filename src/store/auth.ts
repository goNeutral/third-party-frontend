import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// In Jotai, we don't need to specify a key, and we just pass the default value directly
export const userAuthAtom = atomWithStorage(
  'userAuthAtom', // key
  {
    isAuthenticated: false,
    user: null,
    loading: true,
    token: null,
  },
)