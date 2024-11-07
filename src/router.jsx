import React, { useContext, useEffect } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
//import jwt from 'jsonwebtoken';
import App from './App.jsx';

//  importar páginas
import Errorpage from './pages/ErrorPage.jsx';
import Home from './pages/Home.jsx';
import Professores from './pages/Professores.jsx';
import Salas from './pages/Salas.jsx';

//  importar contexto
import AuthContext from './contexts/auth.jsx';



const Private = ({ element }) => {
  
  const { signed, loadingAuth } = useContext(AuthContext);
  console.log('router: checando se o usuário está logado...');

  if (loadingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  };

  if (!signed) {
    return ( <Navigate to="/login" /> );
  };

  return element;
};


export const rts = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Errorpage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/professores',
        element: <Professores />
      },
      {
        path: '/salas',
        element: <Salas />
      },
    ]
  }
]);
