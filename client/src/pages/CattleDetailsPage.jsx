import React from 'react'
import CattleDetails from '../components/CattleDetails'
import { Box, Grid } from '@mui/material'
import { useTheme } from '@emotion/react'
import { tokens } from '../theme'
import Header from '../components/Header'

const CattleDetailsPage = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Box m="20px"  overflow="auto">
      <Header title="CATTLE DETAILS" subtitle="Managing the Cattle Details" />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          {Array.from(Array(10)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Box
                gridColumn="span 3"
                 backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <CattleDetails />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
export default CattleDetailsPage