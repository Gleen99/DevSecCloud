import Head from "next/head";
import clientPromise from "../lib/mongodb";
import moviepage from "./movies/moviepage";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import React from "react";
import Link from "next/link";


type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="container">
        <h1>
          <Link href="/movies/moviepage">
            Voir la liste des films
          </Link>
        </h1>
    </div>
  );
}
