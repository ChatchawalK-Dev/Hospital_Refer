import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import History from './components/History/History';
import Frompesonal from './components/History/Frompesonal';
import PersonInfo from './components/ReferIn/PersonInfo';
import ReferIn from './components/ReferIn/ReferIn';
import ProtectedRoute from './components/Auth/protectedRoute'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import ReferOut from './components/ReferOut/ReferOut';
import PersonInfoOut from './components/ReferOut/PersonInfoOut';
import Personal_Info from './components/History/Personal_Info';
import Address_info from './components/History/Address_info';
import Disease from './components/History/disease';
import Treatment from './components/History/treatment';
import Info from './components/History/infomation';


const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute>
              <App />
            </ProtectedRoute>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element:  <ProtectedRoute>
              <Register />
              </ProtectedRoute>
  },
  {
    path: '/history',
    element: <ProtectedRoute>
              <History />
              </ProtectedRoute>
  },
  {
    path: '/FromPesonal',
    element:  <ProtectedRoute>
              <Frompesonal />
              </ProtectedRoute>
  },
  {
    path : '/PersonInfo',
    element:  <ProtectedRoute>
              <PersonInfo />
              </ProtectedRoute>
  },
  {
    path: '/Info',
    element:  <ProtectedRoute>
              <Info />
              </ProtectedRoute>
  },
  {
    path : '/ReferIn',
    element:  <ProtectedRoute>
              <ReferIn />
              </ProtectedRoute>
  },
  {
    path : '/ReferOut',
    element:  <ProtectedRoute>
              <ReferOut />
              </ProtectedRoute>
  },{
    path : '/PersonInfoOut',
    element:  <ProtectedRoute>
              <PersonInfoOut />
              </ProtectedRoute>
  },{
    path : '/Personal_Info',
    element:  <ProtectedRoute>
              <Personal_Info />
              </ProtectedRoute>
  },{
    path : '/Address_info',
    element:  <ProtectedRoute>
              <Address_info />
              </ProtectedRoute>
  },{
    path : '/Disease',
    element:  <ProtectedRoute>
              <Disease />
              </ProtectedRoute>
  },{
    path : '/Treatment',
    element:  <ProtectedRoute>
              <Treatment />
              </ProtectedRoute>
  },{
    path : '/Frompesonal',
    element:  <ProtectedRoute>
              <Frompesonal />
              </ProtectedRoute>
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found!");
}