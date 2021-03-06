import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { registerUser } from '../../actions/authActions';
import Input from '../common/Input';
import SubmitBtn from '../common/SubmitBtn';
import Spinner from '../common/Spinner/Spinner';
import Modal from '../common/Modal/Modal';

const Register = ({ history, globalErrors, registerUser, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (globalErrors) {
      setErrors(globalErrors);
    }
  }, [globalErrors]);

  const onSubmit = async e => {
    e.preventDefault();

    const newUser = { email, password, password2 };

    const response = await registerUser(newUser);
    if (response.success) {
      setShowModal(true);
    }
  };

  const closeModal = () => history.push('/login');

  const output = loading ? (
    <Spinner />
  ) : (
    <>
      <Modal show={showModal} modalClosed={closeModal}>
        <h1 className="font-semibold text-lg mb-3 text-center">
          Account Created
        </h1>
        <p className="text-center text-blue-600 mb-3">
          Your account was created successfully.
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
          <h2 className="text-3xl text-blue-600 leading-tight">Sign Up</h2>
          <p className="text-base text-orange-500 leading-normal text-center mt-3">
            Create your MoneyTrack account and start getting your finances under
            control
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
            <Input
              error={errors.password2}
              label="Confirm Password"
              name="password2"
              onChange={e => setPassword2(e.target.value)}
              placeholder="Confirm Password"
              type="password"
              value={password2}
            />
            <SubmitBtn value="Register" />
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

export default connect(mapStateToProps, { registerUser })(Register);
