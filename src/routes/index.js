import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { PageLoader } from '../components';

import { selectUser } from '../store/Authenticate/Authenticate.selectors';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

export default function Routes () {
  // Redux
  const user = useSelector(selectUser)

  // State
  const [appLoading, setAppLoading] = useState(true)

  setTimeout(() => {
    setAppLoading(false)
  }, 1000)

  if (appLoading) {
    return <PageLoader />
  } else {
    return user.logged ? <AppRoutes /> : <AuthRoutes />
  }
}