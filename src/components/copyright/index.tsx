import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import React from 'react'

// type Props = {}

const Copyright = (props: any) => {
  return (
    <Typography variant="body1" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">移通校园宣传网站</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Copyright
