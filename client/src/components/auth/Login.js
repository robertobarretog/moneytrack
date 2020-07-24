import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authActions';
import Input from '../common/Input';
import SubmitBtn from '../common/SubmitBtn';
import Spinner from '../common/Spinner/Spinner';

const Login = ({ globalErrors, loginUser, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (globalErrors) {
      setErrors(globalErrors);
    }
  }, [globalErrors]);

  const onSubmit = e => {
    e.preventDefault();

    const userData = { email, password };

    loginUser(userData);
  };

  const output = loading ? (
    <Spinner />
  ) : (
    <div className="container mx-auto p-3">
      <div className="max-w-xl mx-auto flex flex-col items-center p-6 bg-gray-300 mt-10 rounded-lg shadow-xl">
        <h2 className="text-3xl text-blue-600 leading-tight">Log In</h2>
        <p className="text-base text-orange-500 leading-normal text-center mt-3">
          Sign in and start managing your expenses
        </p>
        <form onSubmit={onSubmit} className="flex flex-col mt-6 w-full">
          <Input
            error={errors.email}
            label="Email Address"
            name="email"
            onChange={e => setEmail(e.target.value)}
            placeholder="Email Address"
            type="email"
            value={email}
          />
          <Input
            error={errors.password}
            label="Password"
            name="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            value={password}
          />
          <Link
            className="transition duration-500 ease-in-out text-blue-600 hover:text-blue-500"
            to="/forgot-password"
          >
            Forgot password?
          </Link>
          <SubmitBtn value="Log In" />
        </form>
      </div>
    </div>
  );

  return output;
};

const mapStateToProps = state => ({
  globalErrors: state.errors,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { loginUser })(Login);
