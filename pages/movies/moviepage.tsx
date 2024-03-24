// MoviesPage.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('/api/movies');
                setMovies(response.data.data);
            } catch (error) {
                console.error('An error occurred while fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div>
            <h1>Movies</h1>
            <Link href="/create-movie">
                Create Movie
            </Link>
            <ul>
                {movies.map((movie: any) => (
                    <li key={movie._id}>
                        <Link href={`./moviedetailspage/${movie._id}`}>
                            {movie.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MoviesPage;
