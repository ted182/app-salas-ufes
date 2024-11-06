import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

//import { AuthProvider } from './context/AuthContext';
import { RouterProvider } from 'react-router-dom';
import { rts } from './router';


createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={rts} />
  </>,
)
