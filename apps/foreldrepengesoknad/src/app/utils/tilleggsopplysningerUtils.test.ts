import { cleanupInvisibleCharsFromTilleggsopplysninger } from './tilleggsopplysningerUtils';
import { Tilleggsopplysninger } from '../context/types/Tilleggsopplysninger';

const tilleggsopplysningerMedBegrunnelse = {
    begrunnelseForSenEndring: { tekst: 'Begrunnelse\u0009med\u0009blanke\u0009tegn.' },
};

describe('TilleggsopplysningerUtils', () => {
    it('skal erstatte alle ulovlige blanke tegn fra Tilleggsopplysninger med space', async () => {
        const cleanedTilleggsopplysning = cleanupInvisibleCharsFromTilleggsopplysninger(
            tilleggsopplysningerMedBegrunnelse
        );
        expect(cleanedTilleggsopplysning.begrunnelseForSenEndring!.tekst).toEqual('Begrunnelse med blanke tegn.');
    });
    it('skal ikke feile med manglende info om tilleggsopplysninger', async () => {
        const cleanedManglendeTilleggsopplysning = cleanupInvisibleCharsFromTilleggsopplysninger(
            {} as Tilleggsopplysninger
        );
        expect(cleanedManglendeTilleggsopplysning).toEqual({});
    });
});
