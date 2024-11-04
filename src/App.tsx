import React from 'react';
    import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
    import { UserProvider, useUser } from './contexts/UserContext';
    import { UpdateProvider } from './contexts/UpdateContext';
    import LoginForm from './components/LoginForm';
    import UpdateForm from './components/UpdateForm';
    import UpdateList from './components/UpdateList';
    import ReportView from './components/ReportView';

    const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
      const { user } = useUser();
      return user ? children : <Navigate to="/login" />;
    };

    const App: React.FC = () => {
      return (
        <UserProvider>
          <UpdateProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <div className="p-4">
                        <UpdateForm />
                        <UpdateList />
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reports"
                  element={
                    <ProtectedRoute>
                      <ReportView />
                    </ProtectedRoute>
                  }
                />
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Routes>
            </Router>
          </UpdateProvider>
        </UserProvider>
      );
    };

    export default App;
