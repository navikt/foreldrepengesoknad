import { AnnenForelder } from 'common/types';
import {
    formaterNavn,
    getErSøkerFarEllerMedmor,
    getKjønnFromFnr,
    getMorErAleneOmOmsorg,
    getNavnGenitivEierform,
    getNavnPåForeldre,
} from './personUtils';
import { Søker } from '@navikt/fp-types';

describe('personUtils', () => {
    it('skal formatere navn med mellomnavn', () => {
        const verdi = formaterNavn('Espen', 'Utvikler', true, 'Senior');
        expect(verdi).toBe('Espen Senior Utvikler');
    });
    it('skal formatere navn uten å vise fornavn', () => {
        const verdi = formaterNavn('Espen', 'Utvikler', false, 'Senior');
        expect(verdi).toBe('Espen Senior');
    });
    it('skal formatere navn uten mellomnavn', () => {
        const verdi = formaterNavn('Espen', 'Utvikler', true);
        expect(verdi).toBe('Espen Utvikler');
    });

    it('skal legge s til navn som ikke slutter på s', () => {
        const verdi = getNavnGenitivEierform('Espen', 'nb');
        expect(verdi).toBe('Espens');
    });

    it('skal ikke legge s til navn som slutter på s', () => {
        const verdi = getNavnGenitivEierform('Thomas', 'nb');
        expect(verdi).toBe(`Thomas'`);
    });

    it('skal finne kjønn kvinne fra annen foreldres fnr', () => {
        const annenForelder = {
            kanIkkeOppgis: false,
            fnr: '08088620241',
        } as AnnenForelder;

        const kjønn = getKjønnFromFnr(annenForelder);

        expect(kjønn).toBe('K');
    });

    it('skal finne kjønn mann fra annen foreldres fnr', () => {
        const annenForelder = {
            kanIkkeOppgis: false,
            fnr: '08088611111',
        } as AnnenForelder;

        const kjønn = getKjønnFromFnr(annenForelder);

        expect(kjønn).toBe('M');
    });

    it('skal ikke finne kjønn når annen forelder ikke er oppgitt', () => {
        const annenForelder = {
            kanIkkeOppgis: true,
        } as AnnenForelder;
        const kjønn = getKjønnFromFnr(annenForelder);
        expect(kjønn).toBeUndefined();
    });

    it('skal returnere true når mor har aleneomsorg', () => {
        const søkerErMor = true;
        const søkerErAleneOmOmsorg = true;
        const annenForelder = {
            kanIkkeOppgis: true,
        } as AnnenForelder;

        const kjønn = getMorErAleneOmOmsorg(søkerErMor, søkerErAleneOmOmsorg, annenForelder);

        expect(kjønn).toBe(true);
    });

    it('skal returnere false når søker ikke er mor', () => {
        const søkerErMor = false;
        const søkerErAleneOmOmsorg = true;
        const annenForelder = {
            kanIkkeOppgis: true,
        } as AnnenForelder;

        const kjønn = getMorErAleneOmOmsorg(søkerErMor, søkerErAleneOmOmsorg, annenForelder);

        expect(kjønn).toBe(false);
    });

    it('skal returnere false når mor ikke har aleneomsorg og annen forelder ikke kan oppgis', () => {
        const søkerErMor = true;
        const søkerErAleneOmOmsorg = false;
        const annenForelder = {
            kanIkkeOppgis: false,
        } as AnnenForelder;

        const kjønn = getMorErAleneOmOmsorg(søkerErMor, søkerErAleneOmOmsorg, annenForelder);

        expect(kjønn).toBe(false);
    });

    it.skip('skal returnere navn på foreldre der far er søker', () => {
        const person = {
            fornavn: 'Espen',
        } as Søker;
        const annenForelder = {
            kanIkkeOppgis: false,
            fornavn: 'Olga',
        } as AnnenForelder;
        const erFarEllerMedmor = true;

        const navnPåForeldre = getNavnPåForeldre(person, annenForelder, erFarEllerMedmor, 'intlMock' as any);

        expect(navnPåForeldre.mor).toBe('Olga');
        expect(navnPåForeldre.farMedmor).toBe('Espen');
    });

    it.skip('skal returnere navn på foreldre der mor er søker', () => {
        const person = {
            fornavn: 'Olga',
        } as Søker;
        const annenForelder = {
            kanIkkeOppgis: false,
            fornavn: 'Espen',
        } as AnnenForelder;
        const erFarEllerMedmor = false;

        const navnPåForeldre = getNavnPåForeldre(person, annenForelder, erFarEllerMedmor, 'intlMock' as any);

        expect(navnPåForeldre.mor).toBe('Olga');
        expect(navnPåForeldre.farMedmor).toBe('Espen');
    });

    it('should return true if SøkerRolle is FAR r MEDMOR ', () => {
        expect(getErSøkerFarEllerMedmor('far')).toBe(true);
        expect(getErSøkerFarEllerMedmor('medmor')).toBe(true);
    });

    it('should return false if SøkerRolle is neither FAR, nor MEDMOR', () => {
        expect(getErSøkerFarEllerMedmor('mor')).toBe(false);
    });
});
