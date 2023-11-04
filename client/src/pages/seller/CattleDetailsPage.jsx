import React, { useEffect } from 'react'
import CattleDetails from '../../components/CattleDetails'
import { Box, CircularProgress, Grid } from '@mui/material'
import { useTheme } from '@emotion/react'
import { tokens } from '../../theme'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/Header'
import { animalList } from '../../actions/animalActions'

const CattleDetailsPage = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const { loading, animals, error } = useSelector((state) => state.animalList)

  useEffect(() => {
    dispatch(animalList)
  }, [dispatch])

  return (
    <Box m="20px" overflow="auto">
      <Header title="CATTLE DETAILS" subtitle="Managing the Cattle Details" />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          {loading ? (
            <CircularProgress color="secondary" sx={{ margin: '50px' }} />
          ) : (
            animals.map((item, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Box
                  gridColumn="span 3"
                  backgroundColor={colors.primary[400]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CattleDetails item={item} />
                </Box>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  )
}
export default CattleDetailsPage
