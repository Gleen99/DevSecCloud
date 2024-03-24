import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateMoviePage = () => {
    const [formData, setFormData] = useState({
        title: '',
    });

    const router = useRouter();

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
            await axios.post('/api/movies', formData);
            toast.success('Votre film a été créé avec succès');
            router.push('/movies/commentdetailspage');
        } catch (error) {
            console.error('An error occurred while creating movie:', error);
            toast.error('Une erreur est survenue lors de la création du film');
        }
    };

    return (
        <div>
            <h1>Create Movie</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateMoviePage;
