import { useState } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Avatar, CssBaseline, TextField, Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import axios from 'axios';
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

export default function Login({ onSubmit = async (data) => alert(JSON.stringify(data)) }) {
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

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

  const onLogin = (data) => {
    axios.post('https://reqres.in/api/login', data)
      .then(function (response) {
        console.log('LOGIN-SUCCESSFUL', response);
        setLoginSuccess('Welcome Back!');
      })
      .catch(function (error) {
        console.log('LOGIN-FAILED', error);
        setLoginError('Username or password is incorrect');
      });
  };

  return (
    <div className='background'>
      <img className='unsplash' src={unsplash} alt='snow'/>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          {loginSuccess && <p className='logged' style={{color: 'green'}}>{loginSuccess}</p>}
          {loginError && <p className='logged' style={{color: 'red'}}>{loginError}</p>}
          <form
            className={classes.form}
            onSubmit={handleSubmit(onLogin)} >
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
              color='primary'
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
