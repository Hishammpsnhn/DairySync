import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Header from './Header'
import { TextField } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function MilkYeildModel({
  open,
  setOpen,
  handleClose,
  animalIdentificationCode,
  id
}) {
  const [formData, setFormData] = React.useState({ milkYeild: '',id })
  const [formError, setFormError] = React.useState({ milkYeild: false })
  const handleFormSubmit = () => {
    if (formData.milkYeild) {
        console.log(formData)
    } else {
      setFormError({
        milkYeild: !formData.milkYeild,
       
      })
    }
  }
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

    // Reset the error when the user starts typing
    setFormError({
      ...formError,
      [e.target.name]: false,
    })
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header
            title="Today's Milk Collection"
            subtitle={`ID : ${animalIdentificationCode.toUpperCase()}`}
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Milk Yield Today In Liter"
            value={formData.milkYeild}
            onChange={handleInputChange}
            name="milkYeild"
            error={formError.milkYeild}
             sx={{ marginBottom:'15px'}}
          />
          <Button
            color="secondary"
            variant="contained"
            onClick={handleFormSubmit}
            
          >
            Add product
          </Button>
        </Box>
      </Modal>
    </div>
  )
}
