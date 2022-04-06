import React from "react"
import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"

const Auth = () => {
	const location = useLocation()
	const { user } = useAppSelector((state) => state.User)
	return user ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />
}

export default Auth
