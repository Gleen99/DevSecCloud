import { Db } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export async function getMovieCollection(): Promise<Db> {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    return db;
}
