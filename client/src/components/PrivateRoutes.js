import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ username }) => {
  
  return (
    <>
      {username ? <Outlet  /> : <Navigate to="/login" />}
    </>
  )
}

export default PrivateRoutes