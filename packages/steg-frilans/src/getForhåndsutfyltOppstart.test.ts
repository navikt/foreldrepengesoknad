import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

import { getForhåndsutfyltOppstart } from './getForhåndsutfyltOppstart';

const oppdrag = (fom: string): EksternArbeidsforholdDto_fpoversikt => ({
    arbeidsgiverId: fom,
    arbeidsgiverIdType: 'orgnr',
    arbeidsgiverNavn: 'Oppdragsgiver',
    fom,
    stillingsprosent: 0,
});

describe('getForhåndsutfyltOppstart', () => {
    it('skal finne tidligste gyldige startdato og normalisere tidspunkt', () => {
        expect(
            getForhåndsutfyltOppstart([
                oppdrag('2025-03-01T00:00:00.000Z'),
                oppdrag('ugyldig'),
                oppdrag('2024-12-15T12:30:00.000Z'),
            ]),
        ).toBe('2024-12-15');
    });

    it('skal returnere undefined uten gyldige oppdrag', () => {
        expect(getForhåndsutfyltOppstart([])).toBeUndefined();
        expect(getForhåndsutfyltOppstart([oppdrag('ugyldig')])).toBeUndefined();
    });
});
