import dayjs from 'dayjs';
import getIntlMock from 'utils-test/intl-test-helper';
import { validateDatoForAleneomsorg, validateFornavn, validateEtternavn } from './annenForelderValidering';

describe('annenForelderValidering', () => {
    const intlMock = getIntlMock();

    it('skal feile validering når dato for aleneomsorg ikke er oppgitt', () => {
        const familiehendelsedato = dayjs();
        const datoForAleneomsorg = undefined;

        const resultat = validateDatoForAleneomsorg(intlMock, familiehendelsedato)(datoForAleneomsorg!);

        expect(resultat).toBe('Du må oppgi dato for når du ble alene om omsorgen');
    });

    it('skal feile validering når dato for aleneomsorg ikke er en gyldig dato', () => {
        const familiehendelsedato = dayjs();
        const datoForAleneomsorg = '202-01-01';

        const resultat = validateDatoForAleneomsorg(intlMock, familiehendelsedato)(datoForAleneomsorg);

        expect(resultat).toBe('Dato for aleneomsorg må være en gyldig dato på formatet dd.mm.åååå');
    });

    it('skal feile validering når dato for aleneomsorg er før familiehendelse dato', () => {
        const familiehendelsedato = dayjs('2021-02-02');
        const datoForAleneomsorg = '2021-01-01';

        const resultat = validateDatoForAleneomsorg(intlMock, familiehendelsedato)(datoForAleneomsorg);

        expect(resultat).toBe('Dato for aleneomsorg kan ikke være tidligere enn 02.02.2021');
    });

    it('skal ikke feile validering når dato for aleneomsorg er etter familiehendelse dato', () => {
        const familiehendelsedato = dayjs('2021-02-02');
        const datoForAleneomsorg = '2021-03-03';

        const resultat = validateDatoForAleneomsorg(intlMock, familiehendelsedato)(datoForAleneomsorg);

        expect(resultat).toBeUndefined();
    });

    it('skal feile validering når fornavn skal oppgis og fornavn mangler', () => {
        const kanIkkeOppgis = false;
        const fornavn = undefined;

        const resultat = validateFornavn(intlMock, kanIkkeOppgis)(fornavn!);

        expect(resultat).toBe('Fornavn må fylles ut');
    });

    it('skal ikke feile validering når fornavn skal oppgis og fornavn ikke mangler', () => {
        const kanIkkeOppgis = false;
        const fornavn = 'Solstråle';

        const resultat = validateFornavn(intlMock, kanIkkeOppgis)(fornavn);

        expect(resultat).toBeUndefined();
    });

    it('skal ikke feile validering når fornavn ikke skal oppgis og fornavn mangler', () => {
        const kanIkkeOppgis = true;
        const fornavn = undefined;

        const resultat = validateFornavn(intlMock, kanIkkeOppgis)(fornavn!);

        expect(resultat).toBeUndefined();
    });

    it('skal feile validering når etternavn skal oppgis og etternavn mangler', () => {
        const kanIkkeOppgis = false;
        const etternavn = undefined;

        const resultat = validateEtternavn(intlMock, kanIkkeOppgis)(etternavn!);

        expect(resultat).toBe('Etternavn må fylles ut');
    });

    it('skal ikke feile validering når etternavn skal oppgis og etternavn ikke mangler', () => {
        const kanIkkeOppgis = false;
        const etternavn = 'Solstråle';

        const resultat = validateEtternavn(intlMock, kanIkkeOppgis)(etternavn);

        expect(resultat).toBeUndefined();
    });

    it('skal ikke feile validering når etternavn ikke skal oppgis og etternavn mangler', () => {
        const kanIkkeOppgis = true;
        const etternavn = undefined;

        const resultat = validateEtternavn(intlMock, kanIkkeOppgis)(etternavn!);

        expect(resultat).toBeUndefined();
    });
});
