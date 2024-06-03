import React from 'react'
import withAdmin from '../HOC/withAdmin'

function AuthenticationTestAdmin() {
  return (
    <div>You are an admin!</div>
  )
}

export default withAdmin(AuthenticationTestAdmin);