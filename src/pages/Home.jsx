import MovieCard from '../components/MovieCard';
import { useState, useEffect } from 'react';
import { searchMovies, getPopularMovies } from '../services/api.js';
import '../css/Home.css';

function Home() {
    // const movies = [
    //     { id: 1, title: 'John Wick', release_date: '2020' },
    //     { id: 2, title: 'Terminator', release_date: '1999' },
    //     { id: 3, title: 'The Matrix', release_date: '1998' },
    // ];

    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError('Failed to load movies...');
            } finally {
                setLoading(false);
            }
        };
        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading) return;
        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (err) {
            setError('Failed to search movies...');
            console.log(err);
        } finally {
            setLoading(false);
        }
        // setSearchQuery('');
        // console.log(searchQuery);
    };

    return (
        <div className='home'>
            <form onSubmit={handleSearch} className='search-form'>
                <input
                    type='text'
                    placeholder='Search for movies...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='search-input'
                />
                <button type='submit' className='search-button'>
                    Search
                </button>
            </form>

            {error && <div>{error}</div>}

            {loading ? (
                <h1 className='loading'>Loading...</h1>
            ) : (
                <div className='movies-grid'>
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
