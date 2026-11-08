import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Watchlist from './pages/Watchlist';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      <header className="navbar">
        <Link to="/" className="logo">🎬 Cinema</Link>

        <nav className="nav-links">
          {user ? (
            <>
              <span className="meta">أهلاً، {user.name}</span>
              <Link to="/watchlist">Watchlist</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn">Register</Link>
            </>
          )}
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/watchlist"
            element={
              <ProtectedRoute>
                <Watchlist />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}