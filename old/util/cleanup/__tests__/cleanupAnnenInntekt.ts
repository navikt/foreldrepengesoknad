import { dateToISOString } from '@navikt/sif-common-formik/lib';
import visibility from '../../../steg/andreInntekter/annenInntektModal/visibility';
import { AnnenInntekt, AnnenInntektType, JobbIUtlandetInntekt } from '../../../types/søknad/AnnenInntekt';
import cleanup from '../cleanupAnnenInntekt';

const annenInntekt: AnnenInntekt = {
    type: AnnenInntektType.JOBB_I_UTLANDET,
    vedlegg: [],
    arbeidsgiverNavn: 'something',
    land: 'some country',
    pågående: true,
    tidsperiode: {
        fom: dateToISOString(new Date()),
    },
};

const annenInntektWithInvisibleChars: AnnenInntekt = {
    type: AnnenInntektType.JOBB_I_UTLANDET,
    arbeidsgiverNavn: 'Navn med\u00AD soft hyphen som skal erstattes med space',
} as JobbIUtlandetInntekt;

describe('cleanupAnnenInntekt', () => {
    describe('when fields are not visible', () => {
        beforeEach(() => {
            visibility.vedlegg = jest.fn(() => false);
            visibility.arbeidsgiverNavn = jest.fn(() => false);
            visibility.land = jest.fn(() => false);
        });

        it('should set fields values to undefined if they are not visible', () => {
            const resultInntekt = cleanup(annenInntekt);
            const { vedlegg, arbeidsgiverNavn, land } = resultInntekt as JobbIUtlandetInntekt;
            expect(vedlegg).toBeUndefined();
            expect(arbeidsgiverNavn).toBeUndefined();
            expect(land).toBeUndefined();
        });
    });

    describe('when fields are visible', () => {
        beforeEach(() => {
            visibility.vedlegg = jest.fn(() => true);
            visibility.arbeidsgiverNavn = jest.fn(() => true);
            visibility.land = jest.fn(() => true);
        });
        it('should set fields to their given values', () => {
            const annenInntektIUtland = { ...annenInntekt, arbeidsgiverNavn: "Navn" };
            const resultInntekt = cleanup(annenInntektIUtland);
            const { vedlegg, arbeidsgiverNavn, land } = resultInntekt as JobbIUtlandetInntekt;
            expect(vedlegg).toBe(annenInntektIUtland.vedlegg);
            expect(arbeidsgiverNavn).toEqual(annenInntektIUtland.arbeidsgiverNavn);
            expect(land).toBe(annenInntektIUtland.land);
        });
        it('should replace invisible chars in arbeidsgivernavn', () => {
            const resultInntekt = cleanup(annenInntektWithInvisibleChars);
            const { arbeidsgiverNavn } = resultInntekt as JobbIUtlandetInntekt;
            expect(arbeidsgiverNavn).toBe('Navn med  soft hyphen som skal erstattes med space');
        });
    });
});
