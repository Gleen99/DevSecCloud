import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const CommentDetailPage = () => {
    const router = useRouter();
    const { idMovie, commentId } = router.query;
    const [comment, setComment] = useState<any>({});
    const [editedText, setEditedText] = useState<string>('');

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const response = await axios.get(`/api/movies/${idMovie}/comments/${commentId}`);
                if (response.data) {
                    setEditedText(response.data.data.text);
                    setComment(response.data.data); // Utilisation de toute la réponse pour le commentaire
                }
            } catch (error) {
                console.error('An error occurred while fetching the comment:', error);
            }
        };

        if (idMovie && commentId) {
            fetchComment();
        }
    }, [idMovie, commentId]);

    const handleUpdate = async () => {
        try {
            await axios.put(`/api/movies/${idMovie}/comments/${commentId}`, {
                text: editedText,
            });
            // Rediriger vers la page des films après la mise à jour
            router.push('/movies/moviepage');
        } catch (error) {
            console.error('An error occurred while updating the comment:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/movies/${idMovie}/comments/${commentId}`);
            // Rediriger vers la page des films après la suppression
            router.push('/movies/moviepage');
        } catch (error) {
            console.error('An error occurred while deleting the comment:', error);
        }
    };

    return (
        <div>
            <h1>{comment.text}</h1>
            <div>
                <label>Text:</label>
                <input type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} />
            </div>

            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default CommentDetailPage;
