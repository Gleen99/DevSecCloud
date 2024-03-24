import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from 'next';
import { getMovieCollection } from '../service/moviesService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return getMovieById(req, res);
    } else if (req.method === 'PUT') {
        return updateMovie(req, res);
    } else if(req.method === 'DELETE') {
        return deleteMovie(req, res);
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Endpoint to retrieve movie by ID
 *     description: Returns movie data based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie
 *     responses:
 *       '200':
 *         description: Movie found
 *       '400':
 *         description: Invalid ID parameter
 *       '404':
 *         description: Movie not found
 */



export async function getMovieById(req: NextApiRequest, res: NextApiResponse) {
    try {
        const db = await getMovieCollection();
        const id = req.query.id as string;

        if (!id) {
            res.status(400).json({ status: 400, message: "ID parameter is missing" });
            return;
        }

        const objectId = new ObjectId(id);
        const movie = await db.collection("movies").findOne({ _id: objectId });

        if (movie) {
            res.status(200).json({ status: 200, data: movie });
        } else {
            res.status(404).json({ status: 404, message: "Movie not found" });
        }
    } catch (error) {
        console.error("An error occurred while fetching movie by ID:", error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Endpoint to update a movie by ID
 *     description: Updates movie data based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie
 *       - name: movieData
 *         in: body
 *         description: The movie data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             year:
 *               type: integer
 *             plot:
 *               type: string
 *     responses:
 *       '200':
 *         description: Movie updated successfully
 *       '404':
 *         description: Movie not found
 */

export async function updateMovie(req: NextApiRequest, res: NextApiResponse) {
    try {
        const db = await getMovieCollection();
        const id = req.query.id as string;
        const updatedMovieData = req.body;
        const objectId = new ObjectId(id);
        const result = await db.collection("movies").updateOne({ _id: objectId }, { $set: updatedMovieData });

        if (result.modifiedCount > 0) {
            res.status(200).json({ status: 200, message: "Movie updated successfully" });
        } else {
            res.status(404).json({ status: 404, message: "Movie not found" });
        }
    } catch (error) {
        console.error("An error occurred while updating movie:", error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Endpoint to delete a movie by ID
 *     description: Deletes movie data based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie
 *     responses:
 *       '200':
 *         description: Movie deleted successfully
 *       '404':
 *         description: Movie not found
 */

export async function deleteMovie(req: NextApiRequest, res: NextApiResponse) {
    try {
        const db = await getMovieCollection();
        const id = req.query.id as string;
        const objectId = new ObjectId(id);
        const result = await db.collection("movies").deleteOne({ _id: objectId });

        if (result.deletedCount > 0) {
            res.status(200).json({ status: 200, message: "Movie deleted successfully" });
        } else {
            res.status(404).json({ status: 404, message: "Movie not found" });
        }
    } catch (error) {
        console.error("An error occurred while deleting movie:", error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}
