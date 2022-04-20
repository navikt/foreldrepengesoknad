import AnnenForelder from 'app/context/types/AnnenForelder';
import Barn, { BarnType, FødtBarn } from 'app/context/types/Barn';
import { Søknad } from 'app/context/types/Søknad';
import { Periode, PeriodeHull, Periodetype, Uttaksperiode } from 'uttaksplan/types/Periode';
import { AnnenForelderOppgittForInnsending, cleanSøknad } from './apiUtils';

const getAnnenForelderUførMock = (
    urUførInput: boolean | undefined,
    erForSykInput: boolean | undefined
): AnnenForelder => {
    return {
        fornavn: 'Mor',
        etternavn: 'Utvikler',
        erUfør: urUførInput,
        erForSyk: erForSykInput,
        kanIkkeOppgis: false,
    } as AnnenForelder;
};

const getAnnenForelderMock = (): AnnenForelder => {
    return {
        fornavn: 'Mor',
        etternavn: 'UtenUførInfo',
        kanIkkeOppgis: false,
    } as AnnenForelder;
};

const getAnnenForelderIkkeOppgittMock = (): AnnenForelder => {
    return {
        kanIkkeOppgis: true,
    } as AnnenForelder;
};

const getBarnMock = (datoForAleneomsorgInput: string | undefined) => {
    return {
        type: BarnType.FØDT,
        datoForAleneomsorg: datoForAleneomsorgInput,
        fødselsdatoer: [new Date('01-01-2022')],
        termindato: new Date('01-02-2022'),
        fnr: '01010111111',
    } as FødtBarn;
};

const getSøknadMock = (annenForelderInput: AnnenForelder, barnInput: Barn, uttaksplanInput: Periode[]) => {
    return {
        type: 'foreldrepenger',
        annenForelder: annenForelderInput,
        barn: barnInput,
        uttaksplan: uttaksplanInput,
        søker: {
            språkkode: 'nb',
        },
        søkersituasjon: {
            rolle: 'mor',
            situasjon: 'fødsel',
        },
        tilleggsopplysninger: {},
    } as Søknad;
};

describe('cleanUpSøknadsdataForInnsending', () => {
    const barnMock = getBarnMock('2021-01-01');
    const annenForelderMock = getAnnenForelderUførMock(true, false);
    const søknadMedMorErUfør = getSøknadMock(annenForelderMock, barnMock, []);
    const cleanedSøknad = cleanSøknad(søknadMedMorErUfør);

    it('skal bytte navn på annenForelder.erUfør til annenForelder.harMorUføretrygd', () => {
        expect(cleanedSøknad.annenForelder.hasOwnProperty('harMorUføretrygd')).toBe(true);
        expect(cleanedSøknad.annenForelder.hasOwnProperty('erUfør')).toBe(false);
        const { harMorUføretrygd } = cleanedSøknad.annenForelder as AnnenForelderOppgittForInnsending;
        expect(harMorUføretrygd).toBe(true);
    });

    it('skal fjerne input om annenForelder.erForSyk fra søknad for innsending', () => {
        expect(cleanedSøknad.annenForelder.hasOwnProperty('erForSyk')).toBe(false);
    });

    it('skal ikke feile for ikke oppgitt forelder', () => {
        const søknadMedIkkeOppgitForelder = getSøknadMock(getAnnenForelderIkkeOppgittMock(), barnMock, []);
        const cleanedSøknadUtenForelder = cleanSøknad(søknadMedIkkeOppgitForelder);
        expect(cleanedSøknadUtenForelder.annenForelder.kanIkkeOppgis).toBe(true);
    });

    it('skal ikke feile når ingen input om erUfør eller erForSyk på annenForelder', () => {
        const annenForelderUtenUførInfo = getAnnenForelderMock();
        const søknadMedAnnenForelderUtenUførInfo = getSøknadMock(annenForelderUtenUførInfo, barnMock, []);
        const cleanedSøknadUtenUførInfo = cleanSøknad(søknadMedAnnenForelderUtenUførInfo);
        expect(cleanedSøknadUtenUførInfo.annenForelder.hasOwnProperty('erUfør')).toBe(false);
    });

    it('skal fjerne info om erMorForSyk fra periodene men ikke endre resten av uttaksplanen', () => {
        const periodeUttak = {
            id: '0',
            type: Periodetype.Uttak,
            erMorForSyk: true,
            tidsperiode: { fom: new Date('2021-01-01'), tom: new Date('2021-01-03') },
        } as Uttaksperiode;
        const periodeHull = {
            id: '1',
            type: Periodetype.Hull,
            tidsperiode: { fom: new Date('2021-01-04'), tom: new Date('2021-01-11') },
        } as PeriodeHull;
        const søknadMedUttaksPlan = getSøknadMock(annenForelderMock, barnMock, [periodeUttak, periodeHull]);
        const cleanedSøknadUtenUførInfo = cleanSøknad(søknadMedUttaksPlan);
        expect(cleanedSøknadUtenUførInfo.uttaksplan.length).toBe(1);
        expect(cleanedSøknadUtenUførInfo.uttaksplan[0].hasOwnProperty('erMorForSyk')).toBe(false);
        const { erMorForSyk, ...expectedPeriodeUttak } = periodeUttak;
        expect(cleanedSøknadUtenUførInfo.uttaksplan[0]).toEqual(expectedPeriodeUttak);
    });

    it('skal fjerne datoForAleneomsorg, type og fnr fra født barn objektet og beholde fødsel og termindato', () => {
        const barn = cleanedSøknad.barn as FødtBarn;
        expect(barn.hasOwnProperty('datoForAleneomsorg')).toBe(false);
        expect(barn.hasOwnProperty('type')).toBe(false);
        expect(barn.hasOwnProperty('fnr')).toBe(false);
        expect(barn.fødselsdatoer).toEqual(barnMock.fødselsdatoer);
        expect(barn.termindato).toEqual(barnMock.termindato);
    });

    it('skal konvertere språkkode til upper case', () => {
        expect(cleanedSøknad.søker.språkkode).toEqual('NB');
    });

    it('skal konvertere rolle til upper case', () => {
        expect(cleanedSøknad.søker.rolle).toEqual('MOR');
    });

    it('skal legge situasjon på søknadsobjektet', () => {
        expect(cleanedSøknad.situasjon).toEqual('fødsel');
    });

    it('skal ikke ha søkersituasjon objektet ved innsending', () => {
        expect(cleanedSøknad.hasOwnProperty('søkersituasjon')).toBe(false);
    });
});
