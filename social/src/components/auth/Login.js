import React, { useState,useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import '../../css/login.css' 


const Login = ({ login, isAuthenticated }) => {

  useEffect(() => {

    // fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json()).then(res =>
    //     {
    //         console.log(res)

    //     }
    // );
});


// refreshing the page when logged in should keep the user logged in


    const [formData, setFormData] = useState({
      name: '',
        password: ''
      });

      const { name, password } = formData;

      const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const onSubmit = (e) => {
        e.preventDefault();
        login(name, password);
        
      };

      if (isAuthenticated) {
        return <Navigate to="/main" />;
      }








    return(
    <section>
      <div className='whole'>

        <div className='logbox'>
        <p className="lead">
        Sign Into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input className='inputs'
            type="name"
            placeholder="Name"
            name="name"
            value={name}
            required 
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required 
            minLength="6"
          />
        </div>
        <br/>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>

        </div>
        <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>  
      </div>

    </section>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };
  
  const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated
  });

  
export default connect(mapStateToProps,{ login })(Login);