import React from 'react';
import CheckPermissions from './CheckPermissions';

const Authorized = ({ children, authority, noMatch = null }) => {
  const childrenRender = typeof children === 'undefined' ? null : children;
  const dom = CheckPermissions(authority, childrenRender, noMatch);
  return <>{dom}</>;
};

export default Authorized;
