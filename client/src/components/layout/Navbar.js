import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

const Navbar = ({ isAuthenticated, logoutUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onLogoutClick = e => {
    e.preventDefault();
    logoutUser();
  };

  const toggleMenu = e => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const authLinks = (
    <>
      <Link
        to="/dashboard"
        className="block px-2 py-1 text-orange-300 rounded hover:text-orange-500 hover:bg-blue-500"
      >
        Dashboard
      </Link>
      <div>
        <a
          href="#!"
          onClick={onLogoutClick}
          className="mt-1 sm:mt-0 sm:ml-2 block px-2 py-1 text-orange-300 rounded hover:text-orange-500 hover:bg-blue-500"
        >
          Logout
        </a>
      </div>
    </>
  );

  const guestLinks = (
    <>
      <Link
        to="/login"
        className="block px-2 py-1 text-orange-300 rounded hover:text-orange-500 hover:bg-blue-500"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="mt-1 sm:mt-0 sm:ml-2 block px-2 py-1 text-orange-300 rounded hover:text-orange-500 hover:bg-blue-500"
      >
        Sign Up
      </Link>
    </>
  );

  const btnClass = isOpen
    ? 'text-md px-2 pt-2 pb-4 sm:flex sm:p-0'
    : 'text-md px-2 pt-2 pb-4 hidden sm:flex sm:p-0';

  return (
    <nav className="bg-blue-600 sm:flex sm:justify-between sm:items-center sm:p-4">
      <div className="flex items-center justify-between p-4 sm:p-0">
        <div className="text-orange-500 mr-6">
          <span className="font-semibold text-xl">
            <Link to="/">MoneyTrack</Link>
          </span>
        </div>
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="block text-orange-300 hover:text-white focus:text-white focus:outline-none"
          >
            <svg className="fill-current h-6 w-6" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      <div className={btnClass}>{isAuthenticated ? authLinks : guestLinks}</div>
    </nav>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
