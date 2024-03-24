import { NextApiRequest, NextApiResponse } from 'next';
import { getMovieCollection } from './service/moviesService';

/**
 * @swagger
 * /api/movies:
 *   get:
 *     description: Returns movies
 *     responses:
 *       200:
 *         description: List of movies
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return getMovie(req, res);
    } else if (req.method === 'POST') {
        return createMovie(req, res);
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
export async function getMovie(req: NextApiRequest, res: NextApiResponse) {
    try {
        const db = await getMovieCollection();
        const movies = await db.collection("movies").find({}).limit(50).toArray();
        res.json({ status: 200, data: movies });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}

/**
 * @swagger
 * /api/movies:
 *   post:
 *     description: Creates a new movie
 *     parameters:
 *       - name: movieData
 *         in: body
 *         description: The movie data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             year:
 *               type: integer
 *             Plot:
 *               type: string
 *     responses:
 *       201:
 *         description: Movie created successfully
 *       500:
 *         description: Internal Server Error
 */
export async function createMovie(req: NextApiRequest, res: NextApiResponse) {
    try {
        const db = await getMovieCollection();
        const movieData = req.body;
        const result = await db.collection("movies").insertOne(movieData);
        const createdMovie = result;
        res.status(201).json({ status: 201, message: "Movie created successfully" });
    } catch (error) {
        console.error("An error occurred while creating movie:", error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}
