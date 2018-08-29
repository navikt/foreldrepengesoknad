import moment from 'moment';
import { InjectedIntl } from 'react-intl';
import * as getMessage from 'common/util/i18nUtils';
import { fjortenUkerPluss3Number, tomorrow } from '../../values';
import { getTerminbekreftelseDatoRegler } from '../terminbekreftelsedato';

const intl = {} as InjectedIntl;
const callMåOppgis = (terminbekreftelseDato: Date | undefined) =>
    getTerminbekreftelseDatoRegler(terminbekreftelseDato, undefined, intl)[0].test();
const callIdagEllerTidligere = (terminbekreftelseDato: Date) =>
    getTerminbekreftelseDatoRegler(terminbekreftelseDato, undefined, intl)[1].test();
const callUtstedtUke26EllerSenere = (terminbekreftelseDato: Date, termindato: Date) =>
    getTerminbekreftelseDatoRegler(terminbekreftelseDato, termindato, intl)[2].test();

describe('Terminbekreftelsedato validation', () => {
    beforeEach(() => {
        (getMessage.default as any) = jest.fn();
    });

    it('should return false if date is undefined', () => {
        expect(callMåOppgis(undefined)).toEqual(false);
    });

    it('should return false if date is later than today', () => {
        expect(callIdagEllerTidligere(tomorrow.toDate())).toEqual(false);
    });

    it('should return false if termindato is too late for applicant to be in uke26+3', () => {
        const termindato = moment().toDate();
        const ugyldigTerminbekreftelse = moment()
            .subtract(fjortenUkerPluss3Number + 1, 'days')
            .toDate();
        expect(callUtstedtUke26EllerSenere(ugyldigTerminbekreftelse, termindato)).toEqual(false);
    });

    it('should return true if date is valid', () => {
        const termindato = moment().toDate();
        const gyldigTerminbekreftelse = moment()
            .subtract(fjortenUkerPluss3Number, 'days')
            .toDate();

        expect(callMåOppgis(gyldigTerminbekreftelse)).toEqual(true);
        expect(callIdagEllerTidligere(termindato)).toEqual(true);
        expect(callUtstedtUke26EllerSenere(gyldigTerminbekreftelse, termindato)).toEqual(true);
    });
});
