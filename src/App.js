import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import theme from './theme'; 

// Components
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary'; 
import Loading from './components/Loading'; 

// صفحات متأخرة التحميل (Lazy Loading)
const Home = React.lazy(() => import('./pages/Home'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const CreatePost = React.lazy(() => import('./pages/CreatePost'));
const AdminRoute = React.lazy(() => import('./components/AdminRoute'));

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <Navbar />
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/create-post" 
                  element={
                    <AdminRoute>
                      <CreatePost />
                    </AdminRoute>
                  } 
                />
                <Route
                  path="/dashboard/*"
                  element={
                    <AdminRoute>
                      <Dashboard />
                    </AdminRoute>
                  }
                />
              </Routes>
            </Suspense>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
