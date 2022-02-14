import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Form = ({ onSubmitForm, reqStatus, data }) => {

    const [domain, setDomain] = useState(data ? data.domain_name : '');
    const [expires, setExpires] = useState(data ? data.expires_date : '');
    const [registration, setregistration] = useState(data ? data.registration_by : '');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false);
    };

    const SubmitForm = (e) => {
        e.preventDefault();
        if (!domain || !expires || !registration) {
            setError(true)
        }
        else {
            onSubmitForm({
                name: domain,
                expires: expires,
                registration: registration
            })

            setTimeout(() => {
                setDomain('');
                setExpires('');
                setregistration('');
                navigate('/domain/list')
            }, 1500);
        }

    }

    return (
        <form className='shared-form bg-white px-5 pt-5 mt-5 ' onSubmit={SubmitForm} >
            <div className="form-floating mb-4 mt-3">
                <input type="text" className="form-control " id="floatingInput" placeholder="Domain Name" value={domain} onChange={(e) => { setDomain(e.target.value) }} />
                <label htmlFor="floatingInput">Domain Name</label>
            </div>
            <div className="form-floating mb-4">
                <input className="form-control " id="floatingInput" placeholder="History of Expires" value={expires}
                    type='date'
                    onChange={(e) => { setExpires(e.target.value) }} />
                <label htmlFor="floatingInput">History of Expires</label>
            </div>
            <div className="form-floating mb-4">
                <input type="text" className="form-control " id="floatingInput" placeholder="Registration by" value={registration} onChange={(e) => { setregistration(e.target.value) }} />
                <label htmlFor="floatingInput">Registration by</label>
            </div>
            <div className="d-grid gap-2 mt-5">
                <button className="btn btn-primary" type="submit">Register</button>
            </div>

            {error &&
                <Snackbar open={error} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
                        Please Check Your Information
                    </Alert>
                </Snackbar>
            }

        </form>
    )
}

export default Form
