import { Express } from 'express';

export function setupActuators(server: Express) {
    server.get('/internal/health/isAlive', (_request, response) => {
        return response.send({
            status: 'UP',
        });
    });

    server.get('/internal/health/isReady', (_request, response) => {
        return response.send({
            status: 'UP',
        });
    });
}
