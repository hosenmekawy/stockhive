import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "@/lib/auth"

const publicRoutes = ["/login", "/signup"]

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated && !publicRoutes.includes(location.pathname)) {
      navigate("/login")
    }
    if (isAuthenticated && publicRoutes.includes(location.pathname)) {
      navigate("/")
    }
  }, [isAuthenticated, location.pathname, navigate])

  return <>{children}</>
}