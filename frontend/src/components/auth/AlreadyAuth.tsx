import React from "react"
import { Navigate, useLocation, Outlet } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"

const AlreadyAuth = () => {
	const location = useLocation()
	const { user } = useAppSelector((state) => state.User)
	return user ? <Navigate to="/" replace state={{ from: location }} /> : <Outlet />
}

export default AlreadyAuth
