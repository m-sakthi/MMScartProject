import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { register, clearAuthError } from '../../actions/userActions'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/default-avatar.svg");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(state => state.authState);

  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0])
        }
      }
      reader.readAsDataURL(e.target.files[0])
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value })
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', userData.name)
    formData.append('email', userData.email)
    formData.append('password', userData.password)
    formData.append('avatar', avatar);
    dispatch(register(formData))
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
      return
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
    <div className="row justify-content-center mt-15">
      <div className="col-10 col-lg-5">
        <form onSubmit={submitHandler} className="shadow-lg p-10" encType='multipart/form-data'>
          <h1 className="mb-3">Register</h1>

          <div className="form-floating mt-5">
            <input
              name='name'
              type="name"
              id="name_field"
              onChange={onChange}
              className="form-control"
              placeholder='Full Name'
            />
            <label htmlFor="email_field">Full Name</label>
          </div>

          <div className="form-floating mt-5">
            <input
              type="email"
              id="email_field"
              name='email'
              onChange={onChange}
              className="form-control"
              placeholder='Email'
            />
            <label htmlFor="email_field">Email</label>
          </div>

          <div className="form-floating mt-5">
            <input
              name='password'
              onChange={onChange}
              type="password"
              id="password_field"
              className="form-control"
              placeholder='Password'
            />
            <label htmlFor="password_field">Password</label>
          </div>

          <div className='form-group mt-5'>
            <label htmlFor='avatar_upload'>Avatar</label>
            <div className='d-flex align-items-center'>
              <div className='me-3'>
                <figure className='avatar'>
                  <img
                    src={avatarPreview}
                    className='rounded-circle'
                    alt='Avatar'
                  />
                </figure>
              </div>
              <div className='custom-file'>
                <input
                  type='file'
                  name='avatar'
                  onChange={onChange}
                  className='form-control'
                  id='customFile'
                  placeholder='Avatar'
                />
              </div>
            </div>
          </div>

          <button
            id="register_button"
            type="submit"
            className="btn btn-block btn-primary mt-6 py-3"
            disabled={loading}
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  )
}