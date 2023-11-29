import React, { useContext } from 'react'
import ProductCard from '../../components/Card'
import { Box, Grid, Paper } from '@mui/material'
import { experimentalStyled as styled } from '@mui/material/styles'
import { tokens } from '../../theme'
import { useTheme } from '@emotion/react'
import milk from '../../assets/milk-bottle.png'


const Home = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 16 }}
      >
        {Array.from(Array(6)).map((_, index) => (
          <Grid xs={2} sm={4} md={4} key={index}>
           <Box padding={5}>
              <ProductCard />
           </Box>
           
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Home
