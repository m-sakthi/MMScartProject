import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, login } from '../../actions/userActions';
import MetaData from '../layouts/MetaData';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, isAuthenticated } = useSelector(state => state.authState)
  const redirect = location.search ? '/' + location.search.split('=')[1] : '/';

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect)
    }

    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'error',
        onOpen: () => { dispatch(clearAuthError) }
      })
      return
    }
  }, [error, isAuthenticated, dispatch, navigate])

  return (
    <Fragment>
      <MetaData title={`Login`} />
      <div className="row justify-content-center mt-15">
        <div className="col-10 col-lg-5">
          <form onSubmit={submitHandler} className="shadow-lg p-10">
            <h1 className="mb-3">Login</h1>
            <div className="form-group mt-5">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group mt-5">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className='d-flex align-items-center mt-5'>
              <Link to="/password/forgot" className="me-auto">Forgot Password?</Link>
              <Link to="/register" className="float-right mt-3">New User?</Link>
            </div>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block btn-primary mt-6 py-3"
              disabled={loading}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}