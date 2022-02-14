import database from '../Firebase/firebaseConfig';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const DomainListPage = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    database.ref('domains')
      .once('value')
      .then((snapshot) => {
        const domains = [];
        snapshot.forEach((domain) => {
          domains.push({
            id: domain.key,
            ...domain.val(),
            expires_day: getDay(domain.val().expires_date)
          })
        })
        setData(domains)
      })
      .catch((err) => { console.log(err) })

  }, [])

  function getDay(date) {
    const today = new Date();
    const expires = new Date(date);
    const diffTime = Math.abs(expires - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays
  }

  function removeDomain(removeid) {
    database.ref(`domains/${removeid}`).remove()
      .then(() => {
        const domains = data.filter((domain) => {
          return domain.id !== removeid
        })
        setData(domains);
      })
  }

  return (
    <section className='domain-list d-flex justify-content-center align-items-center flex-column'>
      <h1 className='fw-light mt-3 mt-5' > Domain List </h1>
      <div className='w-75 mt-5 bg-white p-5 rounded-3 shadow'>
        <table className='table table-hover' >
          <thead>
            <tr>
              <th scope="col"> Domain Name </th>
              <th scope="col"> Expires </th>
              <th scope="col"> Registration by </th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ expires_day, domain_name, expires_date, registration_by, id }) => (
              <tr key={id} className={expires_day < 15 ? 'table-danger' : expires_day < 60 ? 'table-warning' : 'table-success'} >
                <td  >{domain_name}{expires_day < 15 && <i className="bi bi-exclamation-triangle ms-2 text-danger" style={{ fontSize: '1.2rem' }} data-bs-toggle="tooltip" data-bs-placement="bottom" title="Please renew your domain" ></i>}</td>
                <td>{expires_date}</td>
                <td>{registration_by}</td>
                <td>
                  <Link to={`/domain/update/${id}`}>
                    <i className="bi bi-box-arrow-in-down text-primary p-1 " style={{ fontSize: '24px', cursor: 'pointer' }}></i>
                  </Link>
                </td>
                <td>
                  <i className="bi bi-trash text-danger p-1" style={{ fontSize: '24px', cursor: 'pointer' }}
                    onClick={() => { removeDomain(id) }}></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section >
  )
}

export default DomainListPage