import {NextApiRequest, NextApiResponse} from 'next';
import {getMovieCollection} from "../../service/moviesService";
import {ObjectId} from "mongodb";

/**
 * @swagger
 * /api/movies/{id}/comments:
 *   get:
 *     description: Returns comments for a specific movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie
 *     responses:
 *       '200':
 *         description: Comments found
 *       '400':
 *         description: Invalid ID parameter
 *       '404':
 *         description: Movie not found
 */


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return getComments(req, res);
    } else if (req.method === 'POST') {
        return createComments(req, res);
    } else {
        res.status(405).json({message: 'Method Not Allowed'});
    }
}

export async function getComments(req: NextApiRequest, res: NextApiResponse) {
    try {
        const db = await getMovieCollection();
        const {id} = req.query;
        if (!id) {
            return res.status(400).json({status: 400, message: "movie_id parameter is required"});
        }

        const objectId = new ObjectId(id as string);
        const comments = await db.collection("comments").find({movie_id: objectId}).limit(10).toArray();

        res.json({status: 200, data: comments});
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({status: 500, message: "Internal Server Error"});
    }
}


/**
 * @swagger
 /**
 * @swagger
 * /api/movies/{id}/comments:
 *   post:
 *     description: Creates a new comment for a movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie
 *       - in: body
 *         name: commentData
 *         description: The comment data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             text :
 *               type: string
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Invalid request body or parameters
 *       500:
 *         description: Internal Server Error
 */
export async function createComments(req: NextApiRequest, res: NextApiResponse) {
    try {
        const db = await getMovieCollection();
        const commentData = req.body;
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ status: 400, message: "id parameter is required" });
        }

        const objectId = new ObjectId(id as string);
        const result = await db.collection("comments").insertOne({ ...commentData, movie_id: objectId });
        const createdComments = result;
        res.status(201).json({ status: 201, message: "Comment created successfully" });
    } catch (error) {
        console.error("An error occurred while creating comment:", error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}
