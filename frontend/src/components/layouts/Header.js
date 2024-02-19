import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Image } from 'react-bootstrap';
import { logout } from '../../actions/userActions';
import Avatar from '../common/avatar';
import Socket from '../socket';

export default function Header() {
  const { isAuthenticated, user, isOnline } = useSelector(state => state.authState);
  const { items: cartItems } = useSelector(state => state.cartState)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout);
  }

  return (
    <nav className="navbar row nav-pad-rl bg-light">
      {isAuthenticated && <Socket />}
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            <img width="150px" alt='MMScart Logo' src="/images/logo.svg" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center flex-center">
        {isAuthenticated ?
          (<>
            <Dropdown className='d-inline' >
              <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                <Avatar user={user} isOnline={isOnline} classes='avatar-sm' />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {user.role === 'admin' && <Dropdown.Item onClick={() => { navigate('admin/dashboard') }} className='text-dark'>Dashboard</Dropdown.Item>}
                <Dropdown.Item onClick={() => { navigate('/myprofile') }} className='text-dark'>Profile</Dropdown.Item>
                <Dropdown.Item onClick={() => { navigate('/orders') }} className='text-dark'>Orders</Dropdown.Item>
                <Dropdown.Item onClick={logoutHandler} className='text-danger'>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Link to="/messages" className="nav-link mt-3">
              <i className="fa fa-message nav-icon-xl" aria-hidden="true" />
            </Link>
          </>) :
          <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
        }
        <Link className='nav-link mt-3' to="/cart">
          <span className="icon icon-xl icon-badged ml-3">
            <i className="fa-solid fa-cart-shopping nav-icon-xl" aria-hidden="true"/>
            <span className="badge badge-circle bg-primary">
              {cartItems.length}
            </span>
          </span>
        </Link>
      </div>
    </nav>
  )
}