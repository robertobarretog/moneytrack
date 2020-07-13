import React from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = props => {
  return (
    <>
      {props.location.pathname !== '/' && <Navbar />}
      <main>{props.children}</main>
    </>
  );
};

export default withRouter(Layout);
