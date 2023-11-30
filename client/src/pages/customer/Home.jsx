import React, { useContext } from 'react'
import ProductCard from '../../components/Card'
import { Box, Grid, Paper } from '@mui/material'
import { experimentalStyled as styled } from '@mui/material/styles'
import { tokens } from '../../theme'
import { useTheme } from '@emotion/react'
import milk from '../../assets/milk.png'
import butter from '../../assets/Butter.webp'
import ghee from '../../assets/ghee.jpg'
import paneer from '../../assets/how-to-make-paneer-1.jpg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Products = [
  { name: 'milk', image: milk },
  { name: 'ghee', image: ghee },
  { name: 'butter', image: butter },
  { name: 'paneer', image: paneer },
]
const Home = () => {
  // const theme = useTheme()
  //const colors = tokens(theme.palette.mode);
  const { isAuthenticated } = useSelector((state) => state.user)
  const navigate = useNavigate();

  const handleProduct = (name) => {
    if (isAuthenticated) {
      navigate(`/home/product/${name}`)
    } else {
      navigate('/')
    }
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 16 }}
      >
        {Products.map(({ name, image }, index) => (
          <Grid xs={16} sm={4} md={4} key={index}>
            <Box padding={5}>
              <div onClick={() => handleProduct(name)}>
                <ProductCard name={name} image={image} />
              </div>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Home
