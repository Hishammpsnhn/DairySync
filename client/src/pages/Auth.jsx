import React, { useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Formik } from 'formik'
import * as yup from 'yup'
import { tokens } from '../theme'
import { useTheme } from '@emotion/react'
import { Grid } from '@mui/material'
import { login, registerUser } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Auth() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();

  const {isAuthenticated,user} = useSelector((state) => state.user)

  const [isLogin, setIsLogin] = React.useState(false)

  const handleFormSubmit = (values) => {
    isLogin ? dispatch(login(values)) : dispatch(registerUser(values))
  }

  const inputStyles = {
    background: colors.primary[400], // Change this to your desired background color
  }

  useEffect(() => {
    if (isAuthenticated && user.role !== 'user') {
      navigate('/dashboard');
      return;
    }else if (isAuthenticated && user.role === 'user') {
      navigate('/home');
      return;
    }
  }, [isAuthenticated, navigate, user]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? 'Sign in' : 'Register'}
        </Typography>

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={
            isLogin ? checkoutLoginSchema : checkoutRegisterSchema
          }
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box sx={{ mt: 1 }}>
                {!isLogin && (
                  <TextField
                    InputProps={{
                      style: inputStyles,
                    }}
                    margin="normal"
                    fullWidth
                    required
                    id="userName"
                    type="userName"
                    label="Username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.userName}
                    name="userName"
                    error={!!touched.userName && !!errors.userName}
                    helperText={touched.userName && errors.userName}
                  />
                )}
                <TextField
                  InputProps={{
                    style: inputStyles,
                  }}
                  margin="normal"
                  fullWidth
                  required
                  id="email"
                  type="email"
                  label="Email Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
                {!isLogin && (
                  <TextField
                    InputProps={{
                      style: inputStyles,
                    }}
                    margin="normal"
                    fullWidth
                    required
                    id="contact"
                    type="contact"
                    label="Phone Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.contact}
                    name="contact"
                    error={!!touched.contact && !!errors.contact}
                    helperText={touched.contact && errors.contact}
                  />
                )}
                <TextField
                  InputProps={{
                    style: inputStyles,
                  }}
                  margin="normal"
                  fullWidth
                  required
                  id="password"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
                {!isLogin && (
                  <TextField
                    InputProps={{
                      style: inputStyles,
                    }}
                    margin="normal"
                    fullWidth
                    required
                    id="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirmPassword}
                    name="confirmPassword"
                    error={
                      !!touched.confirmPassword && !!errors.confirmPassword
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                  />
                )}
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2" color="secondary">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      style={{ cursor: 'pointer' }}
                      onClick={() => setIsLogin((prev) => !prev)}
                      variant="body2"
                      color="secondary"
                    >
                      {isLogin
                        ? "Don't have an account? Sign Up"
                        : 'Already have an account? Log In'}
                    </Link>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  color="secondary"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isLogin ? 'Sign in' : 'Register'}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const initialValues = {
  email: '',
  password: '',
  userName: '',
  contact: '',
  confirmPassword: '',
}
const checkoutRegisterSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string('Enter your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),

  userName: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  contact: yup
    .string()
    .required('No contact info provided.')
    .min(10, 'phone number is missing - should be 10.'),
})
const checkoutLoginSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
})
