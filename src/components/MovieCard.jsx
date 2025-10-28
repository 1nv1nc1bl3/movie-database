import '../css/Moviecard.css';
import addfav from '../assets/images/add-fav.png';
import fav from '../assets/images/fav.png';

export default function MovieCard({ movie }) {
    const onFavoriteClick = () => {
        alert('clicked');
    };

    let customDate = new Date(movie.release_date);
    let yearOfMovie = customDate.getFullYear();

    return (
        <div className='movie-card'>
            <div className='movie-poster'>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
                {/* <img src={movie.url} alt={movie.title} /> */}
                <div className='movie-overlay'>
                    <button className='favorite-btn' onClick={onFavoriteClick}>
                        <img src={addfav} alt='add favorite' />
                    </button>
                </div>
            </div>
            <div className='movie-info'>
                <h3>{movie.title}</h3>
                <p>{yearOfMovie}</p>
            </div>
        </div>
    );
}
