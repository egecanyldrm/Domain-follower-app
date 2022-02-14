import React, { useState } from 'react'
import Form from '../Components/Form'
import database from '../Firebase/firebaseConfig'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const AddDomainPage = () => {
  const [reqStatus, setAddStatus] = useState();

  const onSubmitForm = ({ name, expires, registration }) => {
    database.ref('domains')
      .push({
        domain_name: name,
        expires_date: expires,
        registration_by: registration
      })
      .then(() => {
        setAddStatus(true);
      })
      .catch((e) => {
        setAddStatus(false);
      })

  }

  return (
    <section className='d-flex add-page'>
      <div className='m-auto mt-5 text-center' >
        <h1 className='fw-light mt-3' > Add a Domain </h1>
        <Form onSubmitForm={onSubmitForm} status={reqStatus} />
      </div>
      {reqStatus &&
        <Snackbar open={reqStatus} autoHideDuration={4000} >
          <Alert severity={reqStatus ? 'success' : 'error'} sx={{ width: '100%' }}>
            {reqStatus ? 'Registration is Successful' : 'Registration Error'}
          </Alert>
        </Snackbar>
      }
    </section>
  )
}

export default AddDomainPage