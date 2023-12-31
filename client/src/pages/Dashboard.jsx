import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from '../theme'
import { mockTransactions } from '../data/mockData'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import EmailIcon from '@mui/icons-material/Email'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import TrafficIcon from '@mui/icons-material/Traffic'
import Header from '../components/Header'
import StatBox from '../components/StatBox'
import ProgressCircle from '../components/ProgressCirlcle'
import LineChart from '../components/LineChart'
import BarChart from '../components/BarChart'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  adminDashboard,
  adminDashboardBooking,
  sellerDashboard,
  sellerDashboardOrders,
} from '../actions/dashboardAction'
import BasicModal from '../components/Model'

const Dashboard = () => {
  const user = useSelector((state) => state.user.user)
  const { dashboardStatBox, loading, error, bookingOrders } = useSelector(
    (state) => state.dashboard
  )

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    if (user.role === 'admin') {
      dispatch(adminDashboard)
      dispatch(adminDashboardBooking)
    } else if (user.role === 'seller') {
      dispatch(sellerDashboard)
      dispatch(sellerDashboardOrders)
    }
  }, [dispatch, user.role])

  return (
    <>
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

          <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 20px',
              }}
            >
              <DownloadOutlinedIcon sx={{ mr: '10px' }} />
              Download Reports
            </Button>
          </Box>
        </Box>

        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="150px"
          // gap="20px"
          columnGap="20px"
          rowGap="40px"
        >
          {/* ROW 1 */}
          {user?.role === 'admin' && (
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => handleOpen()}
            >
              <StatBox
                title={`${dashboardStatBox.stat1} L`}
                subtitle="RICH"
                progress={`${dashboardStatBox.stat1 / 500} `}
                increase={`+${((dashboardStatBox.stat1 / 500) * 100).toFixed(
                  2
                )}%`}
                icon={
                  <PointOfSaleIcon
                    sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
                  />
                }
              />
            </Box>
          )}

          <Box
            gridColumn={user?.role === 'admin' ? 'span 3' : 'span 4'}
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={
                user?.role === 'admin'
                  ? `${dashboardStatBox.stat2} L`
                  : `${dashboardStatBox.stat2}`
              }
              subtitle={
                user?.role === 'admin' ? 'TONED' : 'Orders Left to Deliver'
              }
              progress={`${dashboardStatBox.stat2 / 500} `}
              increase={`+${((dashboardStatBox.stat2 / 500) * 100).toFixed(
                2
              )}%`}
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
                />
              }
            />
          </Box>
          <Box
            gridColumn={user?.role === 'admin' ? 'span 3' : 'span 4'}
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => handleOpen()}
          >
            <StatBox
              title={
                user?.role === 'admin'
                  ? `${dashboardStatBox.stat3} L`
                  : `${dashboardStatBox.stat3}`
              }
              subtitle={user?.role === 'admin' ? 'SMART' : 'Total Products'}
              progress={`${dashboardStatBox.stat3 / 500} `}
              increase={`+${((dashboardStatBox.stat3 / 500) * 100).toFixed(
                2
              )}%`}
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
                />
              }
            />
          </Box>

          <Box
            gridColumn={user?.role === 'admin' ? 'span 3' : 'span 4'}
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={
                user?.role === 'admin'
                  ? `${dashboardStatBox.stat4} L`
                  : `${dashboardStatBox.stat4}`
              }
              subtitle={user?.role === 'admin' ? 'SKIMMED' : 'Total Breeds'}
              progress={`${dashboardStatBox.stat4 / 500} `}
              increase={`+${((dashboardStatBox.stat4 / 500) * 100).toFixed(
                2
              )}%`}
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
                />
              }
            />
          </Box>

          {/* ROW 2 */}
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                {/* <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Orders Generated
                </Typography> */}
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >
                  {/* $59,342.32 */}
                  {user.role !== 'admin' ?'Orders Generated':'Milk supply' }
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlinedIcon
                    sx={{ fontSize: '26px', color: colors.greenAccent[500] }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box height="250px" m="-20px 0 0 0">
              {user.role === 'admin' ? (
                <LineChart isDashboard={true} />
              ) : (
                <BarChart isDashboard={true} />
              )}
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                {user.role === 'admin' ? 'Recent Booking' : 'Orders To Deliver'}
              </Typography>
            </Box>
            {bookingOrders.map((order, i) => (
              <Box
                key={`${order.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
                onClick={() =>  navigate('/orders')}
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {order?.productType}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {order.userId.contactno}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>
                  {user.role === 'admin'
                    ? new Date(order.bookingDate).toLocaleDateString()
                    : new Date(order.createdAt).toLocaleDateString()}
                </Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  {order.quantity}{' '}
                  <span style={{ fontSize: '12px' }}>
                    {user.role === 'admin' ? ' L ' : 'Kg'}
                  </span>
                </Box>
              </Box>
            ))}
          </Box>

          {/* ROW 3 */}
          {/* <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
        </Box>
      </Box>
      <BasicModal
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        id={user._id}
        addMilk={user.role === 'admin' ? true : false} 
        seller = {true}
      />
    </>
  )
}

export default Dashboard
