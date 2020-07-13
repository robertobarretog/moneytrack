import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { forgotPassword } from '../../actions/authActions';
import Input from '../common/Input';
import SubmitBtn from '../common/SubmitBtn';
import Modal from '../common/Modal/Modal';
import Spinner from '../common/Spinner/Spinner';

const ForgotPassword = ({ globalErrors, forgotPassword, loading }) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [forgotPasswordState, setForgotPasswordState] = useState(false);

  useEffect(() => {
    if (globalErrors) {
      setErrors(globalErrors);
    }
  }, [globalErrors]);

  const onSubmit = async e => {
    e.preventDefault();

    const userData = { email };

    const response = await forgotPassword(userData);
    if (response.success) {
      setEmail('');
      setForgotPasswordState(true);
    }
  };

  const closeModal = () => setForgotPasswordState(false);

  const output = loading ? (
    <Spinner />
  ) : (
    <>
      <Modal show={forgotPasswordState} modalClosed={closeModal}>
        <h1 className="font-semibold text-lg mb-3 text-center">Email Sent</h1>
        <p className="text-center text-blue-600 mb-3">
          A URL to reset your password was sent to your email address. The link
          will be valid for 30 minutes.
        </p>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={closeModal}
            className="transition duration-500 ease-in-out bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg mr-3"
          >
            Close
          </button>
        </div>
      </Modal>
      <div className="container mx-auto p-3">
        <div className="max-w-xl mx-auto flex flex-col items-center p-6 bg-gray-300 mt-10 rounded-lg shadow-xl">
          <h2 className="text-2xl text-blue-600 leading-tight">
            Forgot Password
          </h2>
          <p className="text-base text-orange-500 leading-normal text-center mt-3">
            Enter your email address and a URL will be sent to reset your
            password
          </p>
          <form onSubmit={onSubmit} className="flex flex-col mt-6 w-full">
            <Input
              error={errors.email}
              label="Email Address"
              name="email"
              onChange={e => setEmail(e.target.value)}
              placeholder="Email Address"
              value={email}
            />
            <SubmitBtn value="Submit" />
          </form>
        </div>
      </div>
    </>
  );

  return output;
};

const mapStateToProps = state => ({
  globalErrors: state.errors,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);
