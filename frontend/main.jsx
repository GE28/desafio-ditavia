import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './pages/Home';
import CreateSmartphoneForm from './pages/CreateSmartphoneForm';
import UpdateSmartphoneForm from './pages/UpdateSmartphoneForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: < Home />
  }, {
    path: '/edit-smartphones/:id',
    element: <UpdateSmartphoneForm />
  },
  {
    path: '/add-smartphones',
    element: <CreateSmartphoneForm />
  }
]);

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
