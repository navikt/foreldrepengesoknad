import AnnenForelder from 'app/context/types/AnnenForelder';
import Barn, { BarnType } from 'app/context/types/Barn';
import { Søknad } from 'app/context/types/Søknad';
import { Periode, PeriodeHull, Periodetype, Uttaksperiode } from 'uttaksplan/types/Periode';
import { AnnenForelderOppgittForInnsending, cleanUpSøknadsdataForInnsending } from './apiUtils';

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
    return { type: BarnType.FØDT, datoForAleneomsorg: datoForAleneomsorgInput } as Barn;
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
    } as Søknad;
};

describe('cleanUpSøknadsdataForInnsending', () => {
    const barnMock = getBarnMock('2021-01-01');
    const annenForelderMock = getAnnenForelderUførMock(true, false);
    const søknadMedMorErUfør = getSøknadMock(annenForelderMock, barnMock, []);
    const cleanedSøknad = cleanUpSøknadsdataForInnsending(søknadMedMorErUfør);

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
        const cleanedSøknadUtenForelder = cleanUpSøknadsdataForInnsending(søknadMedIkkeOppgitForelder);
        expect(cleanedSøknadUtenForelder.annenForelder.kanIkkeOppgis).toBe(true);
    });

    it('skal ikke feile når ingen input om erUfør eller erForSyk på annenForelder', () => {
        const annenForelderUtenUførInfo = getAnnenForelderMock();
        const søknadMedAnnenForelderUtenUførInfo = getSøknadMock(annenForelderUtenUførInfo, barnMock, []);
        const cleanedSøknadUtenUførInfo = cleanUpSøknadsdataForInnsending(søknadMedAnnenForelderUtenUførInfo);
        expect(cleanedSøknadUtenUførInfo.annenForelder.hasOwnProperty('erUfør')).toBe(false);
    });

    it('skal fjerne info om erMorForSyk fra periodene men ikke endre resten av uttaksplanen', () => {
        const periodeUttak = {
            type: Periodetype.Uttak,
            erMorForSyk: true,
        } as Uttaksperiode;
        const periodeHull = {
            type: Periodetype.Hull,
        } as PeriodeHull;
        const søknadMedUttaksPlan = getSøknadMock(annenForelderMock, barnMock, [periodeUttak, periodeHull]);
        const cleanedSøknadUtenUførInfo = cleanUpSøknadsdataForInnsending(søknadMedUttaksPlan);
        expect(cleanedSøknadUtenUførInfo.uttaksplan.length).toBe(2);
        expect(cleanedSøknadUtenUførInfo.uttaksplan[0].hasOwnProperty('erMorForSyk')).toBe(false);
        const { erMorForSyk, ...expectedPeriodeUttak } = periodeUttak;
        expect(cleanedSøknadUtenUførInfo.uttaksplan[0]).toEqual(expectedPeriodeUttak);
        expect(cleanedSøknadUtenUførInfo.uttaksplan[1]).toEqual(periodeHull);
    });

    it('skal fjerne datoForAleneomsorg fra barn men ikke endre resten av objektet', () => {
        const { datoForAleneomsorg, ...barnRest } = barnMock;
        expect(cleanedSøknad.barn.hasOwnProperty('datoForAleneomsorg')).toBe(false);
        expect(cleanedSøknad.barn).toEqual(barnRest);
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
