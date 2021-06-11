import { formaterNavn } from './personUtils';

describe('<personUtils>', () => {
    it('skal formatere navn med mellomnavn', () => {
        const verdi = formaterNavn('Espen', 'Utvikler', 'Senior');
        expect(verdi).toBe('Espen Senior Utvikler');
    });

    it('skal formatere navn uten mellomnavn', () => {
        const verdi = formaterNavn('Espen', 'Utvikler');
        expect(verdi).toBe('Espen Utvikler');
    });
});
