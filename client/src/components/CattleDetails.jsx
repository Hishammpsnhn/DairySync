import React from 'react'
import { useTheme } from '@emotion/react'
import {
  Box,
  Typography,
  Grid,
  Divider,
  LinearProgress,
  linearProgressClasses,
  Stack,
  Button,
  IconButton,
  MenuItem,
  Menu,
} from '@mui/material'
import { tokens } from '../theme'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import styled from '@emotion/styled'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import CakeIcon from '@mui/icons-material/Cake'
import EMobiledataIcon from '@mui/icons-material/EMobiledata'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import LocalAtm from '@mui/icons-material/LocalAtm'
import Male from '@mui/icons-material/Male'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCow } from '@fortawesome/free-solid-svg-icons'
import MilkYeildModel from './MilkYeildModel'

const Item = ({ title, value, icon }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box p="10px">
      <Box alignItems="center">
        <Box display="flex" alignItems="start">
          {icon && (
            <span
              style={{
                color: colors.grey[400],
                fontSize: '15px',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              {icon}
              <Typography
                marginLeft="5px"
                variant="h6"
                sx={{ color: colors.grey[400] }}
              >
                {title}
              </Typography>
            </span>
          )}
        </Box>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: colors.grey[300] }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  )
}

const CattleDetails = ({ item }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [modelOpen, setModelOpen] = React.useState(false)

  const handleModelOpen = () => {
    setModelOpen(true)
    handleClose()
  }
  const handleModleClose = () => setModelOpen(false)

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const iconStyle = {
    color: colors.greenAccent[600],
    fontSize: '22px',
    marginRight: '10px',
  }

  return (
    <Box>
      <Box m="20px" display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          {' '}
          <FontAwesomeIcon icon={faCow} style={iconStyle} />{' '}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            CATTLE
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          {' '}
          <Typography
            variant="h4"
            fontWeight="bold"
            textTransform="capitalize"
            sx={{ color: colors.grey[100] }}
          >
            {item.animalIdentification}
          </Typography>
          <IconButton
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ marginLeft: '10px' }}
          >
            <MoreVertIcon
              sx={{
                color: colors.greenAccent[600],
                fontSize: '22px',
              }}
            />
          </IconButton>
          <MilkYeildModel
            open={modelOpen}
            setOpen={setModelOpen}
            handleClose={handleModleClose}
            animalIdentificationCode={item.animalIdentification}
            id={item._id}
          />
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={handleModelOpen}>Today's Milk Yield</MenuItem>
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
          </Menu>{' '}
        </Box>
      </Box>
      <Divider color={colors.greenAccent[600]} />
      <Box mx="20px">
        <Grid
          container
          // rowSpacing={1}
          //columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6}>
            <Item
              title="Date of Birth"
              value={item.dateOfBirth}
              icon={<CalendarMonthIcon />}
            />
          </Grid>
          <Grid item xs={6}>
            <Item
              title="Purchase Price"
              value={item.purchasePrice}
              icon={<LocalAtm />}
            />
          </Grid>
          <Grid item xs={6}>
            <Item
              title="Anmal Type"
              value={item.animalType}
              icon={<CakeIcon />}
            />
          </Grid>
          <Grid item xs={6}>
            <Item title="Breed" value={item.breed} icon={<Male />} />
          </Grid>
          <Grid item xs={6}>
            <Item
              title="Breed"
              value="Beltted Gallaoway"
              icon={<EMobiledataIcon />}
            />
          </Grid>
          <Grid item xs={6}>
            <Item
              title="Breeding Status"
              value={item.breedingStatus}
              icon={<AutorenewIcon />}
            />
          </Grid>
        </Grid>
      </Box>
      <Divider color={colors.greenAccent[600]} />
      <Box m="10px 20px">
        <Box display="flex" alignItems="center">
          <HealthAndSafetyIcon
            sx={{
              color: colors.grey[300],
              fontSize: '15px',
              marginRight: '5px',
            }}
          />
          <Typography variant="h6" sx={{ color: colors.grey[300] }}>
            Health status
          </Typography>
        </Box>
        <BorderLinearProgress
          variant="determinate"
          value={item.healthCondition}
        />
        <Box>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Bad</Typography>
            <Typography>Poor</Typography>
            <Typography>Improving</Typography>
            <Typography>Healthy</Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default CattleDetails

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  margin: '8px 0px',
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: 'rgb(200,57,32)',
    background:
      'linear-gradient(90deg, rgba(200,57,32,1) 8%, rgba(223,249,9,1) 52%, rgba(17,238,0,1) 86%)',
  },
}))
