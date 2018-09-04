import cleanup from './../cleanupAnnenInntekt';
import { AnnenInntekt, AnnenInntektType, JobbIUtlandetInntekt } from '../../../types/søknad/AnnenInntekt';
import visibility from './../../../components/annen-inntekt-modal/visibility';

const annenInntekt: AnnenInntekt = {
    type: AnnenInntektType.JOBB_I_UTLANDET,
    vedlegg: [],
    arbeidsgiverNavn: 'something',
    land: 'some country',
    erNærVennEllerFamilieMedArbeidsgiver: false,
    pågående: true,
    tidsperiode: {
        fom: new Date()
    }
};

describe('cleanupAnnenInntekt', () => {
    describe('when fields are not visible', () => {
        beforeEach(() => {
            visibility.vedlegg = jest.fn(() => false);
            visibility.arbeidsgiverNavn = jest.fn(() => false);
            visibility.land = jest.fn(() => false);
            visibility.erNærVennEllerFamilie = jest.fn(() => false);
        });

        it('should set fields values to undefined if they are not visible', () => {
            const resultInntekt = cleanup(annenInntekt);
            const {
                vedlegg,
                arbeidsgiverNavn,
                land,
                erNærVennEllerFamilieMedArbeidsgiver
            } = resultInntekt as JobbIUtlandetInntekt;
            expect(vedlegg).toBeUndefined();
            expect(arbeidsgiverNavn).toBeUndefined();
            expect(land).toBeUndefined();
            expect(erNærVennEllerFamilieMedArbeidsgiver).toBeUndefined();
        });
    });

    describe('when fields are visible', () => {
        beforeEach(() => {
            visibility.vedlegg = jest.fn(() => true);
            visibility.arbeidsgiverNavn = jest.fn(() => true);
            visibility.land = jest.fn(() => true);
            visibility.erNærVennEllerFamilie = jest.fn(() => true);
        });

        it('should set fields to their given values', () => {
            const resultInntekt = cleanup(annenInntekt);
            const {
                vedlegg,
                arbeidsgiverNavn,
                land,
                erNærVennEllerFamilieMedArbeidsgiver
            } = resultInntekt as JobbIUtlandetInntekt;
            expect(vedlegg).toBe(annenInntekt.vedlegg);
            expect(arbeidsgiverNavn).toBe(annenInntekt.arbeidsgiverNavn);
            expect(land).toBe(annenInntekt.land);
            expect(erNærVennEllerFamilieMedArbeidsgiver).toBe(annenInntekt.erNærVennEllerFamilieMedArbeidsgiver);
        });
    });
});
