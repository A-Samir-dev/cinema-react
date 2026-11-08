import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { imageUrl } from '../api';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMovies = async (query = '') => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/movies', { params: { search: query } });
      const payload = res.data.data;
      setMovies(Array.isArray(payload) ? payload : payload.data ?? []);
    } catch (err) {
      setError('تعذر تحميل الأفلام، تأكد إن السيرفر شغال.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(search);
  };

  return (
    <div>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p className="message">Loading...</p>}
      {error && <p className="message error">{error}</p>}
      {!loading && !error && movies.length === 0 && (
        <p className="message">No movies found.</p>
      )}

      <div className="grid">
        {movies.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id} className="card">
            {imageUrl(movie.image) ? (
              <img className="poster" src={imageUrl(movie.image)} alt={movie.title} />
            ) : (
              <div className="poster">🎬</div>
            )}
            <div className="card-body">
              <h3>{movie.title}</h3>
              <p className="meta">
                {movie.release_year} · ⭐ {movie.rating}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}