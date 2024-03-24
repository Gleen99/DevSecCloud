import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateMoviePage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [formData, setFormData] = useState({
        text: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post(`/api/movies/${id}/comments`, formData); // Fix the URL concatenation
            toast.success('Votre commentaire a été créé avec succès');
            router.push('/movies/moviepage');
        } catch (error) {
            console.error('An error occurred while creating comment:', error);
            toast.error('Une erreur est survenue lors de la création du commentaire');
        }
    };

    return (
        <div>
            <h1>Create Comment</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="text" value={formData.text} onChange={handleChange} />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateMoviePage;
