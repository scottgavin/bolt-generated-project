import React from 'react';
    import { Link } from 'react-router-dom';
    import { useUser } from '../contexts/UserContext';

    const NavBar: React.FC = () => {
      const { user, logout } = useUser();

      return (
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-white">
              <Link to="/dashboard" className="mr-4">Dashboard</Link>
              <Link to="/reports" className="mr-4">Reports</Link>
            </div>
            <div className="text-white">
              {user && (
                <>
                  <span className="mr-4">{user.name}</span>
                  <button onClick={logout} className="bg-red-500 px-2 py-1 rounded">Logout</button>
                </>
              )}
            </div>
          </div>
        </nav>
      );
    };

    export default NavBar;
