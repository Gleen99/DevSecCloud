import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from 'next';
import { getMovieCollection } from '../../../service/moviesService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return getCommentById(req, res);
    }
    else if (req.method === 'PUT') {
        return updateComment(req, res);
    } else if (req.method === 'DELETE') {
        return deleteComment(req, res);
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
/**
 * @swagger
 * /api/movies/{id}/comments/{idComment}:
 *   get:
 *     summary: Endpoint to retrieve a comment by ID
 *     description: Returns comment data based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment
 *     responses:
 *       '200':
 *         description: Comment found
 *       '400':
 *         description: Invalid ID parameter
 *       '404':
 *         description: Comment not found
 */

export async function getCommentById(req: NextApiRequest, res: NextApiResponse) {
    try {
        const db = await getMovieCollection();
        const id = req.query.id as string;
        const idComment = req.query.idComment as string;

        if (!id) {
            return res.status(400).json({ status: 400, message: "ID parameter is missing" });
        }

        if (!idComment) {
            return res.status(400).json({ status: 400, message: "idComment parameter is required" });
        }

        const objectIdComment = new ObjectId(idComment);
        const objectId = new ObjectId(id);
        const comment = await db.collection("comments").findOne({ _id: objectIdComment, movie_id: objectId });

        if (comment) {
            res.status(200).json({ status: 200, data: comment });
        } else {
            res.status(404).json({ status: 404, message: "Comment not found" });
        }
    } catch (error) {
        console.error("An error occurred while fetching comment by ID:", error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}

/**
 * @swagger
 * /api/movies/{id}/comments/{idComment}:
 *   put:
 *     summary: Endpoint to update a comment by ID
 *     description: Updates comment data based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment
 *       - in: body
 *         name: commentData
 *         description: The comment data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             text:
 *               type: string
 *     responses:
 *       '200':
 *         description: Comment updated successfully
 *       '400':
 *         description: Invalid ID parameter or request body
 *       '404':
 *         description: Comment not found
 */



export async function updateComment(req: NextApiRequest, res: NextApiResponse) {
    try {
        const db = await getMovieCollection();
        const id = req.query.id as string;
        const idComment = req.query.idComment as string;
        const commentData = req.body;

        if (!id) {
            res.status(400).json({ status: 400, message: "ID parameter is missing" });
            return;
        }

        if (!idComment) {
            res.status(400).json({ status: 400, message: "idComment parameter is missing" });
            return;
        }

        const objectId = new ObjectId(id);
        const objectIdComment = new ObjectId(idComment);

        const result = await db.collection("comments").updateOne({ _id: objectIdComment, movie_id: objectId }, { $set: commentData });

        if (result.modifiedCount > 0) {
            res.status(200).json({ status: 200, message: "Comment updated successfully" });
        } else {
            res.status(404).json({ status: 404, message: "Comment not found" });
        }
    } catch (error) {
        console.error("An error occurred while updating comment:", error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}

/**
 * @swagger
 * /api/movies/{id}/comments/{idComment}:
 *   delete:
 *     summary: Endpoint to delete a comment by ID
 *     description: Deletes comment data based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment
 *     responses:
 *       '200':
 *         description: Comment deleted successfully
 *       '400':
 *         description: Invalid ID parameter
 *       '404':
 *         description: Comment not found
 */


export async function deleteComment(req: NextApiRequest, res: NextApiResponse) {
    try {
        const db = await getMovieCollection();
        const id = req.query.id as string;
        const idComment = req.query.idComment as string;

        if (!id) {
            res.status(400).json({ status: 400, message: "ID parameter is missing" });
            return;
        }

        if (!idComment) {
            res.status(400).json({ status: 400, message: "idComment parameter is missing" });
            return;
        }

        const objectId = new ObjectId(id);
        const objectIdComment = new ObjectId(idComment);

        const result = await db.collection("comments").deleteOne({ _id: objectIdComment, movie_id: objectId });

        if (result.deletedCount > 0) {
            res.status(200).json({ status: 200, message: "Comment deleted successfully" });
        } else {
            res.status(404).json({ status: 404, message: "Comment not found" });
        }
    } catch (error) {
        console.error("An error occurred while deleting comment:", error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}
