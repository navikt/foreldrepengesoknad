import cleanup from './../cleanupAnnenInntekt';
import { AnnenInntekt, AnnenInntektType, JobbIUtlandetInntekt } from '../../../types/søknad/AnnenInntekt';

jest.mock('./../../../components/annen-inntekt-modal/visibility', () => ({
    vedlegg: () => false,
    arbeidsgiverNavn: () => false,
    land: () => false,
    erNærVennEllerFamilie: () => false
}));

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
