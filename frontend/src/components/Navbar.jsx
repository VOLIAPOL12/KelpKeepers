import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();
  return (
    <AppBar sx={{backgroundColor: 'rgba(255, 255, 255, 0.98)'}}>
      <Toolbar >
        <Typography variant='h6' component='div' sx={{flexGrow: 1, cursor:'pointer', color: "#000"}} onClick={() => navigate('/')}>
          KelpKeepers Australia
        </Typography>
        <Stack direction='row' spacing={2}>
          <Button sx={{color: "#000"}}><Link to='/login'>Login</Link></Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar