import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Header from './Header'
import Modal from '@mui/material/Modal'
import { Autocomplete, Button, TextField } from '@mui/material'
import { secondDataCompletion } from '../utils/secondAutoCompletion'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
}

export default function BasicModal({ open, setOpen, id, handleClose }) {
  const [formData, setFormData] = useState(initialValues)
  const [formError, setFormError] = useState(initialErrValues)
  const [secondAutocompleteOptions, setSecondAutocompleteOptions] = useState([])
  const [thirdAutocompleteOptions, setthirdAutocompleteOptions] = useState([])

  const handleFieldChange = (fieldName) => (event, newValue) => {
    const updatedValue = event
      ? event.target
        ? event.target.value
        : newValue
      : newValue
    console.log(fieldName, event, newValue, updatedValue)
    if (
      fieldName === 'category' ||
      fieldName === 'breed' ||
      fieldName === 'type'
    ) {
      setFormData({ ...formData, [fieldName]: newValue })
      if (newValue === 'Milk') {
        setSecondAutocompleteOptions(['Cattle', 'Buffaloes', 'Goat'])
      } else if (newValue === 'Ghee') {
        setSecondAutocompleteOptions(['Cow Ghee', 'Buffalo Ghee'])
      } else if (newValue === 'Butter') {
        setSecondAutocompleteOptions(['Salted Butter', 'Unsalted Butter'])
      } else if (newValue === 'Paneer') {
        setSecondAutocompleteOptions([
          'Regular Paneer',
          'Malai Paneer',
          'Smoked Paneer',
        ])
      }
      const breeds = secondDataCompletion(newValue)
      console.log(breeds)
      setthirdAutocompleteOptions(breeds)
    } else {
      setFormData({ ...formData, [fieldName]: updatedValue })
    }
  }
  const handleFormSubmit = () => {
    if (formData.category && formData.quantity && formData.type) {
      console.log('Form Data:', formData)
    } else {
      setFormError({
        category: !formData.category,
        quantity: !formData.quantity,
        type: !formData.type,
      })
    }
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          display="grid"
          gap="10px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          // sx={{
          //   '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
          // }}
        >
          <Box sx={{ gridColumn: 'span 4' }}>
            <Header title="ADD PRODUCT" subtitle={`USER ID : ${id}`} />
          </Box>
          <Autocomplete
            options={['Milk', 'Ghee', 'Butter', 'Paneer']}
            getOptionLabel={(option) => option}
            fullWidth
            value={formData.category}
            onChange={handleFieldChange('category')}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                type="text"
                label="Category"
                error={formError.category}
                name="Category"
              />
            )}
            sx={{ gridColumn: 'span 2' }}
          />
          {formData.category && (
            <Autocomplete
              options={secondAutocompleteOptions}
              getOptionLabel={(option) => option}
              fullWidth
              value={formData.type}
              onChange={handleFieldChange('type')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  type="text"
                  label="Type"
                  error={formError.type}
                  name="type"
                />
              )}
              sx={{ gridColumn: 'span 2' }}
            />
          )}

          {formData.type && formData.category === 'Milk' && (
            <Autocomplete
              options={thirdAutocompleteOptions}
              getOptionLabel={(option) => option}
              fullWidth
              value={formData.breed}
              onChange={handleFieldChange('breed')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  type="text"
                  label="Breed"
                  //error={formError.breed}
                  name="breed"
                />
              )}
              sx={{ gridColumn: 'span 2' }}
            />
          )}

          <TextField
            fullWidth
            variant="filled"
            type="number"
            label={`quantity/${formData.category === 'Milk' ? 'liter' : 'kg'}`}
            value={formData.quantity}
            onChange={handleFieldChange('quantity')}
            name="cattleWeight"
            error={formError.quantity}
            sx={{ gridColumn: 'span 2' }}
          />
          <Box
            display="flex"
            justifyContent="end"
            mt="20px"
            sx={{ gridColumn: 'span 4' }}
          >
            <Button
              color="secondary"
              variant="contained"
              onClick={handleFormSubmit}
            >
              Add product
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

const initialValues = {
  category: '',
  type: '',
  breed: '',
  quantity: '',
}
const initialErrValues = {
  category: false,
  type: false,
  breed: false,
  quantity: false,
}
