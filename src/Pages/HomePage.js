import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux';


const HomePage = ({ state }) => {

  const navigate = useNavigate();
  useEffect(() => {
    if (!state.login_status) {
      navigate('/login');
    }
  }, [state.login_status,navigate])

  return (
    <section className='d-flex justify-content-center align-items-center home-page'>
      <div className='mt-5 text-center'>
        <h1 className='fw-light mt-3' > What do you wanna do ?</h1>
        <div className="d-flex flex-wrap mt-5">
          <Link className='home-button fs-5' to='/domain/add' > Add Domain</Link>
          <Link className='home-button fs-5' to='/domain/list'> List Domain </Link>
        </div>
      </div>
    </section>
  )
}
const mapStateToProps = (state) => {
  return {
    state: state.global_state
  }
}

export default connect(mapStateToProps)(HomePage);