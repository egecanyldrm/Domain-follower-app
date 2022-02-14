import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Form from '../Components/Form'
import database from '../Firebase/firebaseConfig'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UpdateDomainPage = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [status, setStatus] = useState(false);
  const [reqStatus, setreqStatus] = useState();

  useEffect(() => {
    database.ref(`domains/${id}`)
      .once('value')
      .then((snapshot) => {
        setData(snapshot.val());
        setStatus(true);
      })
  }, [id]);

  const updateDataFromDB = (data) => {
    database.ref(`domains/${id}`)
      .update(
        {
          domain_name: data.name,
          expires_date: data.expires,
          registration_by: data.registration
        }).then(() => {
          setreqStatus(true)
        })
  }

  return (
    <div>
      {status ? <section className='d-flex add-page'>
        <div className='m-auto mt-5 text-center' >
          <h1 className='fw-light mt-3' > Update Domain </h1>
          <Form data={data} onSubmitForm={updateDataFromDB} />
        </div>
      </section>
        : <div className='container d-flex justify-content-center mt-5' ><div className="spinner-border" role="status"> <span className="visually-hidden">Loading...</span></div></div>
      }
      {reqStatus &&
        <Snackbar open={reqStatus} autoHideDuration={3000} >
          <Alert severity={reqStatus ? 'success' : 'error'} sx={{ width: '100%' }}>
            {reqStatus ? 'Update is Successful' : 'Update Error'}
          </Alert>
        </Snackbar>
      }
    </div>



  )
}

export default UpdateDomainPage