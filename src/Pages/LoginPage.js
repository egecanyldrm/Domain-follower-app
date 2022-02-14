import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import database from '../Firebase/firebaseConfig'
import { connect } from 'react-redux'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});




const LoginPage = ({ dispatch }) => {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(false);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!username || !password === '') {
      setError(true)
    }
    else {
      database.ref('/users')
        .once('value')
        .then((snapshot) => {
          const users = snapshot.val();
          users.find((item) => {
            if (item.username === username && item.password === password) {
              dispatch({
                type: "access_user"
              });
              navigate('/');
            }
            else {
              setError(true)
            }
          })
        })
        .catch((err) => {
          console.log('Database cannot connect error type ' + err)
        });
    }
  }

  return (
    <section className='d-flex login-page'>
      <div className='m-auto mt-5 text-center' >
        <h1 className='fw-light mt-3' > Log in </h1>
        <form className='shared-form bg-white px-5 pt-5 mt-5 ' onSubmit={onFormSubmit} >
          <div className="form-floating mb-4 mt-5">
            <input type="text" className="form-control " placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating mb-4 mt-5">
            <input type="password" className="form-control " placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
            <label htmlFor="floatingInput">Password</label>
          </div>
          <div className="d-grid gap-2 mt-5">
            <button className="btn btn-primary" type="submit">Log in</button>
          </div>
          <div className='mt-3 '>
            <span>No Account ? <Link to='' className='text-primary text-decoration-none'> Create one </Link></span>
          </div>

          <Snackbar open={error} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              Please Check Your Information
            </Alert>
          </Snackbar>
        </form>
      </div>
    </section>
  )
}

const mapStateToProps = (state) => {
  return {
    state: state.global_state
  }
}

export default connect(mapStateToProps)(LoginPage)