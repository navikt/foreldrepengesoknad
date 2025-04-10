import { Express } from 'express';

export function setupActuators(server: Express) {
    server.get('/internal/health/isAlive', (_, response) => {
        response.send({
            status: 'UP',
        });
    });

    server.get('/internal/health/isReady', (_, response) => {
        response.send({
            status: 'UP',
        });
    });
}
