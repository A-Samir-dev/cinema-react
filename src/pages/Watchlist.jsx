import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Watchlist() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const res = await api.get('/my-watchlist');
      const payload = res.data.data;
      setMovies(Array.isArray(payload) ? payload : payload.data ?? []);
    } catch {
      setError('تعذر تحميل القائمة.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    await api.delete(`/my-watchlist/${id}`);
    setMovies((prev) => prev.filter((m) => m.id !== id));
  };

  if (loading) return <p className="message">Loading...</p>;
  if (error) return <p className="message error">{error}</p>;

  return (
    <div>
      <h1 className="section-title">My Watchlist</h1>
      {movies.length === 0 && <p className="message">القائمة فاضية.</p>}

      <div className="grid">
        {movies.map((m) => (
          <div key={m.id} className="card">
            <Link to={`/movies/${m.id}`}>
              <div className="poster">🎬</div>
              <div className="card-body">
                <h3>{m.title}</h3>
                <p className="meta">
                  {m.release_year} · ⭐ {m.rating}
                </p>
              </div>
            </Link>
            <div className="card-body">
              <button onClick={() => remove(m.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}