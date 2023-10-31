import React, { useState } from 'react'
import Box from '@mui/material/Box'

import Modal from '@mui/material/Modal'
import { Autocomplete, TextField } from '@mui/material'

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

  const handleFieldChange = (fieldName) => (event, newValue) => {
    const updatedValue = event
      ? event.target
        ? event.target.value
        : newValue
      : newValue
    console.log(fieldName, event, newValue, updatedValue)
    if (fieldName === 'category' || fieldName === 'breed') {
      setFormData({ ...formData, [fieldName]: newValue })
      if (newValue === 'Milk') {
        setSecondAutocompleteOptions(['cattle', 'buffalo', 'goat'])
      } else if (newValue === 'Ghee') {
        setSecondAutocompleteOptions(['ghee1', 'ghee2'])
      } else if (newValue === 'Butter') {
        setSecondAutocompleteOptions(['butter1', 'butter2'])
      } else if (newValue === 'Paneer') {
        setSecondAutocompleteOptions(['paneer1', 'paneer2'])
      }
    } else {
      setFormData({ ...formData, [fieldName]: updatedValue })
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
                //error={formError.animalType}
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
              value={formData.breed}
              onChange={handleFieldChange('breed')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  type="text"
                  label="Breed"
                  error={formError.breed}
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
            label="Cattle weight/kg"
            value={formData.cattleWeight}
            //onChange={handleFieldChange('cattleWeight')}
            name="cattleWeight"
            error={formError.cattleWeight}
            sx={{ gridColumn: 'span 2' }}
          />
        </Box>
      </Modal>
    </div>
  )
}

const initialValues = {
  category: '',
}
const initialErrValues = {
  category: false,
}
