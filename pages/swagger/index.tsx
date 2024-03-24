import React from 'react';
import Head from 'next/head';
import SwaggerUI from "swagger-ui-react";
import 'swagger-ui-react/swagger-ui.css';

const Swagger: React.FC = () => {
    return (
        <div>
            <Head>
                <title>BrowserStack Demo API</title>
                <meta name="description" content="BrowserStack Demo API Swagger" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <SwaggerUI url="/api/doc" />
        </div>
    );
};

export default Swagger;
