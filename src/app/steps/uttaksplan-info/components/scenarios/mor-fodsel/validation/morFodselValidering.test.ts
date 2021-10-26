import dayjs from 'dayjs';
import getIntlMock from 'utils-test/intl-test-helper';
import { validateErStartdatoFørTermindato } from './morFodselValidering';

describe('morFodselValidering', () => {
    const intlMock = getIntlMock();

    it('skal feile validering når permisjonsdato ikke er oppgitt og en skal ha uttak før termin', () => {
        const familiehendelsedato = dayjs().toDate();
        const skalIkkeHaUttakFørTermin = false;
        const permisjonStartdato = undefined;

        const resultat = validateErStartdatoFørTermindato(
            intlMock,
            familiehendelsedato,
            skalIkkeHaUttakFørTermin
        )(permisjonStartdato!);

        expect(resultat).toBe('Startdato for foreldrepengeperioden må være en gyldig dato på formatet dd.mm.åååå');
    });

    it('skal feile validering når en har permisjonsdato og ikke skal ha uttak før termin', () => {
        const familiehendelsedato = dayjs().toDate();
        const skalIkkeHaUttakFørTermin = true;
        const permisjonStartdato = '2021-01-01';

        const resultat = validateErStartdatoFørTermindato(
            intlMock,
            familiehendelsedato,
            skalIkkeHaUttakFørTermin
        )(permisjonStartdato!);

        expect(resultat).toBe(
            'Du må oppgi når du skal starte foreldrepengene, eller krysse av for at du ikke skal ha foreldrepenger før termindato'
        );
    });

    it('skal feile validering når en har er permisjonsdato og uttaksdatoen er en helgedag', () => {
        const familiehendelsedato = dayjs().toDate();
        const skalIkkeHaUttakFørTermin = false;
        const permisjonStartdato = '2021-08-22';

        const resultat = validateErStartdatoFørTermindato(
            intlMock,
            familiehendelsedato,
            skalIkkeHaUttakFørTermin
        )(permisjonStartdato!);

        expect(resultat).toBe('Du kan ikke starte foreldrepengene på en lørdag eller søndag, du må velge en ukedag');
    });

    it('skal feile validering når persmisjonsdatoen er utenfor familiehendelse-avgrensingene', () => {
        const familiehendelsedato = dayjs('2021-08-24').toDate();
        const skalIkkeHaUttakFørTermin = false;
        const permisjonStartdato = '2021-05-31';

        const resultat = validateErStartdatoFørTermindato(
            intlMock,
            familiehendelsedato,
            skalIkkeHaUttakFørTermin
        )(permisjonStartdato!);

        expect(resultat).toBe('Startdatoen må være innen de 12 første ukene før termin eller fødsel');
    });

    it('skal ikke feile validering', () => {
        const familiehendelsedato = dayjs('2021-03-24').toDate();
        const skalIkkeHaUttakFørTermin = false;
        const permisjonStartdato = '2021-03-03';

        const resultat = validateErStartdatoFørTermindato(
            intlMock,
            familiehendelsedato,
            skalIkkeHaUttakFørTermin
        )(permisjonStartdato!);

        expect(resultat).toBeUndefined();
    });
});
