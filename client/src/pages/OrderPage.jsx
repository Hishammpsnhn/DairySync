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
      if (user) {
        const orders = await dispatch(myOrders)
        console.log(orders)
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
      id: order._id,
      productType: order.productType,
      phone:
        user.role === 'seller' || user.role === 'admin'
          ? order.userId?.contactno
          : order.sellerId?.contactno
          ? order.sellerId?.contactno
          : '01010101',
      address: order.address,
      name:
        user.role === 'seller' || user.role === 'admin'
          ? order.userId?.userName
          : order.sellerId?.userName
          ? order.sellerId?.userName
          : 'society',
      quantity: order.quantity,
      status: order.delivered,
      // Add other properties as needed
    }
  })

  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'productType',
      headerName: 'Product',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
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
      headerName: 'Phone Number',
      flex: 1,
    },

    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: ({ row }) => {
        const handleAccessLevelClick = async (userId) => {
          if (!row.status) {
            const userConfirmed = window.confirm(
              'Are you sure you want to change to Delivered?'
            )
            if (userConfirmed) {
              const updatedOrder = await dispatch(OrderUpdate(row.id))
              console.log(updatedOrder);
              setOrders((prevOrders) =>
                prevOrders.map((order) =>
                  order._id === updatedOrder._id ? updatedOrder : order
                )
              )
              console.log(orders)
            }
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
              user.role !== 'user' && handleAccessLevelClick(row.id)
            }
            style={{
              cursor: user.role !== 'user' ? 'pointer' : 'default',
              opacity: user.role !== 'user' ? '1' : '0.7',
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
