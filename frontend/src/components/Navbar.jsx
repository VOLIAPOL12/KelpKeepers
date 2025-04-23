import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <AppBar sx={{backgroundColor: 'rgba(255, 255, 255, 0.4)'}}>
      <Toolbar >
        <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
          KelpKeepers Australia
        </Typography>
        <Stack direction='row' spacing={2}>
          <Button color="inherit"><Link to='/login'>Login</Link></Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar