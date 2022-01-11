import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Avatar, CssBaseline, TextField, Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Copyright from './Copyright';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const unsplash='https://source.unsplash.com/random?snow&client_id=q3ZJvixJoRKUKx2O9KpE10zhmT3HU1wUWrZFXBg0gHw'

export default function Login({
  onSubmit = async (data) => console.log(data),
}) {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    validationSchema: Yup.object({
      email: Yup.string().email('Please enter a valid email').required('Required'),
      password: Yup.string()
        .min(7, 'Password should be longer than 7 characters')
        .required('Required'),
    }),
  });

  return (
    <div className='background'>
      <img src={unsplash} alt='snow'/>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)} >
            <TextField
              error={!!errors.email}
              helperText={errors.email && errors.email.message}
              variant='outlined'
              margin='normal'
              inputRef={register}
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus />
            <TextField
              error={!!errors.password}
              helperText={errors.password && errors.password.message}
              variant='outlined'
              margin='normal'
              inputRef={register}
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password' />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              className={classes.submit}
              data-testid='button' >
              Sign In
            </Button>
          </form>
        </div>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </div>
  );
}
