import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api, { imageUrl } from '../api';
import { useAuth } from '../AuthContext';

export default function MovieDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/movies/${id}`);
        const data = res.data.data;
        setMovie(data.movie ?? data);
        setSimilar(data.similar_movies ?? []);

        if (user) {
          const wl = await api.get('/my-watchlist');
          const list = Array.isArray(wl.data.data) ? wl.data.data : wl.data.data.data ?? [];
          setInWatchlist(list.some((m) => m.id === Number(id)));
        } else {
          setInWatchlist(false);
        }
      } catch {
        setError('الفيلم غير موجود أو حصلت مشكلة في التحميل.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id, user]);

  const toggleWatchlist = async () => {
    if (inWatchlist) {
      await api.delete(`/my-watchlist/${id}`);
      setInWatchlist(false);
    } else {
      await api.post('/my-watchlist', { movie_id: Number(id) });
      setInWatchlist(true);
    }
  };

  if (loading) return <p className="message">Loading...</p>;
  if (error) return <p className="message error">{error}</p>;
  if (!movie) return null;

  return (
    <div>
      <Link to="/" className="back-link">← Back to movies</Link>

      <div className="details">
        {imageUrl(movie.image) ? (
          <img className="details-poster" src={imageUrl(movie.image)} alt={movie.title} />
        ) : (
          <div className="details-poster placeholder">🎬</div>
        )}

        <div className="details-info">
          <h1>{movie.title}</h1>
          <p className="meta">
            {movie.release_year} · ⭐ {movie.rating}
          </p>
          <p className="description">{movie.description}</p>

          {user ? (
            <button className="watch-btn" onClick={toggleWatchlist}>
              {inWatchlist ? '✓ In Watchlist (Remove)' : '+ Add to Watchlist'}
            </button>
          ) : (
            <p className="meta watch-btn">
              <Link to="/login" className="link">سجّل دخول</Link> عشان تضيف الفيلم لقائمتك.
            </p>
          )}
        </div>
      </div>

      {similar.length > 0 && (
        <section>
          <h2 className="section-title">Similar Movies</h2>
          <div className="grid">
            {similar.map((m) => (
              <Link to={`/movies/${m.id}`} key={m.id} className="card">
                {imageUrl(m.image) ? (
                  <img className="poster" src={imageUrl(m.image)} alt={m.title} />
                ) : (
                  <div className="poster">🎬</div>
                )}
                <div className="card-body">
                  <h3>{m.title}</h3>
                  <p className="meta">
                    {m.release_year} · ⭐ {m.rating}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}