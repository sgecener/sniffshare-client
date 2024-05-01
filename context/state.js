import { createContext, useContext, useEffect, useState } from 'react';
import { getUserProfile } from '../data/auth';
import { useRouter } from "next/router"

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [profile, setProfile] = useState({})
  const [token, setToken] = useState("")
  const router = useRouter()

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      if (!("id" in profile)) {
        getUserProfile().then((profileData) => {
          if (profileData) {
            setProfile(profileData)
          }
        })
      }
    }
  }, [token])

  return (
    <AppContext.Provider value={{ profile, token, setToken, setProfile }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
