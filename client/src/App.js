import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar'
import { observer } from 'mobx-react-lite';
import { Context } from './index';
import { check } from './http/userAPI';
import AdminLoader from './components/AdminLoader';

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      user.setUser(true)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [user])

  if (loading) {
    return (
      <AdminLoader />
    )
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
})

export default App;
