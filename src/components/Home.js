import React, { useState } from 'react'
import { Link as RouterLink ,Navigate} from 'react-router-dom'
import validator from 'validator'
import { regexPassword } from '../utils'
// import { useContext } from 'react'
// import { UserContext } from '../App'
import {
  Paper,
  Container,
  Link,
  Stack,
  Button,
  Box,
  Divider,
  Avatar,
  Typography,
  TextField,
  FilledInput,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material'
import {
  Dashboard,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import SickIcon from '@mui/icons-material/Sick';
import theme from '../styles/theme'
import '../styles/App.css'

function Home() {
  // const userContext = useContext(UserContext)
  const [values, setValues] = useState({
    bookName: '',
    writer: '',
    
  })
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    
  })

  const handleLogout = async () => {
    try {
      const response =  fetch('/api/logout', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        // Perform any additional logout-related actions if needed
        console.log('Logout successful');
        // Redirect to the login page or perform any other necessary action
        Navigate('/login');
      } else {
        throw new Error('Failed to logout');
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleChange = (fieldName) => (event) => {
    const currValue = event.target.value
    switch (fieldName) {
      case 'bookName':
        validator(currValue)
          ? setErrors({ ...errors, bookName: false })
          : setErrors({ ...errors, bookName: true })
        break

      case 'writer':
        validator(currValue)
          ? setErrors({ ...errors, writer: false })
          : setErrors({ ...errors, writer: true })
        break

     
      default:
        break;
    }
    setValues({ ...values, [fieldName]: event.target.value })
  }

 

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookName: values.bookName,
          writer: values.writer,
        }),
      })

      if (!res.ok) {
        const error = await res.json()
        return setErrors({
          ...errors,
          fetchError: true,
          fetchErrorMsg: error.msg,
        })
      }

      const data = await res.json()
      setErrors({
        ...errors,
        fetchError: true,
        fetchErrorMsg: data.msg,
      })
      setValues({
        bookName: '',
        writer: '',
        
      })
      return
    } catch (error) {
      setErrors({
        ...errors,
        fetchError: true,
        fetchErrorMsg:
          'There was a problem with our server, please try again later',
      })
    }
  }

  return (
    <>
    {/* {userContext.email && (
          <Route path='/' element={<>Welcome {userContext.email}
          </>} />
          
          
           
        )} */}
<Container className='button'>
          <Button  variant='contained' color='primary'
          onClick={handleLogout}>Logout</Button>
          </Container>
          
      <Container sx={{ marginTop: '5%' }} maxWidth='sm'>
        <Paper elevation={6}>
          <Container
            maxWidth='sm'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '20px',
            }}>
           
            <h2>Dashboard</h2>
          </Container>
          <Stack
            component='form'
            onSubmit={handleSubmit}
            noValidate
            spacing={6}
            sx={{ bgcolor: '#f5f5f6', padding: '40px' }}>
            <TextField
              variant='filled'
              type='text'
              label='BOOK NAME'
              // value={values.bookName}
              onChange={handleChange('bookName')}
              error={errors.bookName}
              helperText={errors.bookName && 'Please insert a valid email address'}
            />

            <FormControl variant='filled'>
              <InputLabel >writer</InputLabel>
              <FilledInput
                
                type= 'text' 
                // value={values.writer}
                onChange={handleChange('writer')}
                error={errors.writer}
                
              />

              
            </FormControl>

         
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}>
              <Button
                
                variant='contained'
                size='large'
                type='submit'
                sx={{
                  minWidth: '70%',
                }}>
                ADD BOOK!
              </Button>
            </Box>
            {errors.fetchError && (
              <FormHelperText error>{errors.fetchErrorMsg}</FormHelperText>
            )}
            <Divider />
           
          </Stack>
        </Paper>
      </Container>
    </>
  )
}

export default Home