require('dotenv').config();

const express = require('express');
const path = require('path');

const server = express();

const mockResponse = {
    fnr: '11111111111',
    fornavn: 'Henrikke',
    etternavn: 'Ibsen',
    kjønn: 'K',
    fødselsdato: '1979-01-28',
    ikkeNordiskEøsLand: true
};

const startServer = html => {
    server.get(
        ['/', '/foreldrepengesoknad-api/rest/personinfo?'],
        (req, res) => {
            res.setHeader(
                'Access-Control-Allow-Origin',
                'http://localhost:8080'
            );
            res.setHeader(
                'Access-Control-Allow-Methods',
                'GET, POST, OPTIONS, PUT, PATCH, DELETE'
            );
            res.setHeader(
                'Access-Control-Allow-Headers',
                'X-Requested-With,content-type'
            );
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.send(mockResponse);
        }
    );

    server.get('/health/isAlive', (req, res) => res.sendStatus(200));
    server.get('/health/isReady', (req, res) => res.sendStatus(200));

    server.post('/foreldrepengesoknad-api/rest/engangsstonad', (req, res) =>
        res.sendStatus(200)
    );

    const port = process.env.PORT || 8888;
    server.listen(port, () => {
        console.log(`Mock-api listening on port: ${port}`);
    });
};

const logError = (errorMessage, details) => console.log(errorMessage, details);

startServer();
