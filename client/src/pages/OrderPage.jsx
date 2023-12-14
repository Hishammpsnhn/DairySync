import React, { useEffect, useState } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { tokens } from '../theme'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { OrderUpdate, myOrders } from '../actions/productAction'

const Orderpage = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.user.user)

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchMyOrders = async () => {
      setLoading(true)
      if (user && user.role !== 'admin') {
        const orders = await dispatch(myOrders)
        if (orders) {
          setLoading(false)
          setOrders(orders)
        }
      }
    }
    fetchMyOrders()
  }, [dispatch, navigate, user])

  const rows = orders.map((order, index) => {
    return {
      id: order._id, // Use the index as the id
      phone:
        user.role === 'seller'
          ? order.userId.contactno
          : order.sellerId.contactno,
      address: order.address,
      name:
        user.role === 'seller'
          ? order.userId.userName
          : order.sellerId.userName,
      quantity: order.quantity,
      status: order.delivered,
      // Add other properties as needed
    }
  })

  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'name',
      headerName: user.role === 'seller' ? 'Name' : 'Seller Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },

    {
      field: 'quantity',
      headerName: 'Quantity  L/Kg',
      flex: 1,
    },
    {
      field: 'address',
      headerName: 'Delivary Address',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: user.role === 'seller' ? 'Phone Number' : 'Seller Phone No',
      flex: 1,
    },

    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: ({ row }) => {
        const handleAccessLevelClick = (userId) => {
          if(row.status === 'Pending') {
          alert('Are you sure you want to change to Delivered')
          dispatch(OrderUpdate(row.id))
          row.status = true
         }
        }

        return (
          <Box
            width="60%"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={!row.status ? 'red' : 'green'}
            borderRadius="4px"
            onClick={() =>
              user.role === 'seller' && handleAccessLevelClick(row.id)
            }
            style={{
              cursor: user.role === 'seller' ? 'pointer' : 'default',
              opacity: user.role === 'seller' ? '1' : '0.7',
            }}
          >
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              {!row.status ? 'Pending' : 'Delivered'}
            </Typography>
          </Box>
        )
      },
    },
  ]

  return (
    <Box m="20px">
      <Header title="ORDERS LIST" subtitle="Manage all orders" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection={false}
          rows={rows}
          columns={columns}
          loading={loading}
          // error={error}
        />
      </Box>
    </Box>
  )
}

export default Orderpage
