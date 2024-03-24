import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from "next/link";

const Moviedetailspage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [movie, setMovie] = useState<any>({});
    const [comments, setComments] = useState([]);

    const [editedPlot, setEditedPlot] = useState<string>('');
    const [editedYear, setEditedYear] = useState<string>('');

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`/api/movies/${id}`);
                setMovie(response.data.data);
                setEditedPlot(response.data.data.plot);
                setEditedYear(response.data.data.year);
            } catch (error) {
                console.error('An error occurred while fetching the movie:', error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/movies/${id}/comments`);
                setComments(response.data.data);
            } catch (error) {
                console.error('An error occurred while fetching comments:', error);
            }
        };

        if (id) {
            fetchMovie();
            fetchComments();
        }
    }, [id]);

    const handleUpdate = async () => {
        try {
            // Make API call to update the movie
            await axios.put(`/api/movies/${id}`, {
                plot: editedPlot,
                year: editedYear
            });
            // Redirect to movies page after update
            router.push('/movies/moviepage');
        } catch (error) {
            console.error('An error occurred while updating the movie:', error);
        }
    };

    const handleDelete = async () => {
        try {
            // Make API call to delete the movie
            await axios.delete(`/api/movies/${id}`);
            // Redirect to movies page after deletion
            router.push('/movies/moviepage');
        } catch (error) {
            console.error('An error occurred while deleting the movie:', error);
        }
    };

    return (
        <div>
            <h1>{movie.title}</h1>
            <div>
                <label>Plot:</label>
                <input type="text" value={editedPlot} onChange={(e) => setEditedPlot(e.target.value)} />
            </div>
            <div>
                <label>Year:</label>
                <input type="text" value={editedYear} onChange={(e) => setEditedYear(e.target.value)} />
            </div>
            <h2>Comments</h2>
            {comments.length > 0 ? (
                <ul>
                    {comments.map((comment: any) => (
                        <li key={comment._id}>
                            <Link href={`/comments/${id}/commentdetailspage/${comment._id}`}>
                                {comment.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments available</p>
            )}
            <div>
                <button>
                    <Link href={`/comments/create-comment/${id}`}>
                        Ajouter un commentaire
                    </Link>
                </button>
            </div>

            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default Moviedetailspage;
