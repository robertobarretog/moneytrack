import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { resetPassword } from '../../actions/authActions';
import Input from '../common/Input';
import SubmitBtn from '../common/SubmitBtn';
import Modal from '../common/Modal/Modal';
import Spinner from '../common/Spinner/Spinner';

const ResetPassword = ({
  globalErrors,
  resetPassword,
  match,
  history,
  loading,
}) => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});
  const [resetPasswordState, setResetPasswordState] = useState(false);

  useEffect(() => {
    if (globalErrors) {
      setErrors(globalErrors);
    }
  }, [globalErrors]);

  const onSubmit = async e => {
    e.preventDefault();

    const userData = { password, password2 };

    const response = await resetPassword(match.params.resettoken, userData);
    if (response.success) {
      setResetPasswordState(true);
    }
  };

  const closeModal = () => history.push('/login');

  const output = loading ? (
    <Spinner />
  ) : (
    <>
      <Modal show={resetPasswordState} modalClosed={closeModal}>
        <h1 className="font-semibold text-lg mb-3 text-center">
          Password Reset
        </h1>
        <p className="text-center text-blue-600 mb-3">
          Your password was changed successfully.
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
            Reset Password
          </h2>
          <p className="text-base text-orange-500 leading-normal text-center mt-3">
            Enter and confirm the new password that you want to use
          </p>
          {errors.token && (
            <p className="text-red-600 text-center mt-3 italic">
              {errors.token}
            </p>
          )}
          <form onSubmit={onSubmit} className="flex flex-col mt-6 w-full">
            <Input
              error={errors.password}
              label="New Password"
              name="password"
              type="password"
              onChange={e => setPassword(e.target.value)}
              placeholder="New Password"
              value={password}
            />
            <Input
              error={errors.password2}
              label="Confirm New Password"
              name="password2"
              type="password"
              onChange={e => setPassword2(e.target.value)}
              placeholder="Confirm New Password"
              value={password2}
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

export default connect(mapStateToProps, { resetPassword })(ResetPassword);
