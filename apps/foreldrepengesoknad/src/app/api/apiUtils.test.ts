import AnnenForelder from 'app/context/types/AnnenForelder';
import Barn, { BarnType, FødtBarn } from 'app/context/types/Barn';
import { Søknad } from 'app/context/types/Søknad';
import { Periode, PeriodeHull, Periodetype, Uttaksperiode } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import {
    AnnenForelderOppgittForInnsending,
    cleanSøknad,
    getPeriodeVedTidspunkt,
    getUttaksplanMedFriUtsettelsesperiode,
} from './apiUtils';

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
        fnr: ['01010111111'],
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
    const fødselsdato = barnMock.fødselsdatoer[0];
    const annenForelderMock = getAnnenForelderUførMock(true, false);
    const søknadMedMorErUfør = getSøknadMock(annenForelderMock, barnMock, []);
    const cleanedSøknad = cleanSøknad(søknadMedMorErUfør, fødselsdato);

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
        const cleanedSøknadUtenForelder = cleanSøknad(søknadMedIkkeOppgitForelder, fødselsdato);
        expect(cleanedSøknadUtenForelder.annenForelder.kanIkkeOppgis).toBe(true);
    });

    it('skal ikke feile når ingen input om erUfør eller erForSyk på annenForelder', () => {
        const annenForelderUtenUførInfo = getAnnenForelderMock();
        const søknadMedAnnenForelderUtenUførInfo = getSøknadMock(annenForelderUtenUførInfo, barnMock, []);
        const cleanedSøknadUtenUførInfo = cleanSøknad(søknadMedAnnenForelderUtenUførInfo, fødselsdato);
        expect(cleanedSøknadUtenUførInfo.annenForelder.hasOwnProperty('erUfør')).toBe(false);
    });

    it('skal fjerne info om erMorForSyk fra periodene men ikke endre resten av uttaksplanen', () => {
        const periodeUttak = {
            id: '0',
            type: Periodetype.Uttak,
            erMorForSyk: true,
            konto: StønadskontoType.Fellesperiode,
            tidsperiode: { fom: new Date('2021-01-01'), tom: new Date('2021-01-03') },
        } as Uttaksperiode;
        const periodeHull = {
            id: '1',
            type: Periodetype.Hull,
            tidsperiode: { fom: new Date('2021-01-04'), tom: new Date('2021-01-11') },
        } as PeriodeHull;
        const søknadMedUttaksPlan = getSøknadMock(annenForelderMock, barnMock, [periodeUttak, periodeHull]);
        const cleanedSøknadUtenUførInfo = cleanSøknad(søknadMedUttaksPlan, fødselsdato);
        expect(cleanedSøknadUtenUførInfo.uttaksplan.length).toBe(1);
        expect(cleanedSøknadUtenUførInfo.uttaksplan[0].hasOwnProperty('erMorForSyk')).toBe(false);
        const { erMorForSyk, ...expectedPeriodeUttak } = periodeUttak;
        expect(cleanedSøknadUtenUførInfo.uttaksplan[0]).toEqual(expectedPeriodeUttak);
    });
    it('skal fjerne periode uten konto', () => {
        const periodeUttakUtenKonto = {
            id: '0',
            type: Periodetype.Uttak,
            erMorForSyk: true,
            tidsperiode: { fom: new Date('2021-01-01'), tom: new Date('2021-01-03') },
        } as Uttaksperiode;

        const søknadMedUttaksPlan = getSøknadMock(annenForelderMock, barnMock, [periodeUttakUtenKonto]);
        const cleanedSøknadUtenUførInfo = cleanSøknad(søknadMedUttaksPlan, fødselsdato);
        expect(cleanedSøknadUtenUførInfo.uttaksplan.length).toBe(0);
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

//Periode 1:
const fraDato_1 = new Date('2022-01-25');
const tilDato_1 = new Date('2022-01-28');
const periode_1: Partial<Periode> = {
    id: '1',
    type: Periodetype.Uttak,
    tidsperiode: {
        fom: fraDato_1,
        tom: tilDato_1,
    },
};

//Periode 2:
const fraDato_2 = new Date('2022-01-31');
const tilDato_2 = new Date('2022-02-07');
const periode_2: Partial<Periode> = {
    id: '2',
    type: Periodetype.Uttak,
    tidsperiode: {
        fom: fraDato_2,
        tom: tilDato_2,
    },
};

//Periode 3: (1 dag)
const fraDato_3 = new Date('2022-02-11');
const tilDato_3 = new Date('2022-02-11');
const periode_3: Partial<Periode> = {
    id: '3',
    type: Periodetype.Uttak,
    tidsperiode: {
        fom: fraDato_3,
        tom: tilDato_3,
    },
};

//Periode 4:
const fraDato_4 = new Date('2022-02-14');
const tilDato_4 = new Date('2022-02-24');
const periode_4: Partial<Periode> = {
    id: '4',
    type: Periodetype.Uttak,
    tidsperiode: {
        fom: fraDato_4,
        tom: tilDato_4,
    },
};

//Periode 5: 28.02, 1 dag, ikke skuddår
const fraDato_5 = new Date('2022-02-28');
const tilDato_5 = new Date('2022-02-28');
const periode_5: Partial<Periode> = {
    id: '5',
    type: Periodetype.Uttak,
    tidsperiode: {
        fom: fraDato_5,
        tom: tilDato_5,
    },
} as Periode;

//Periode 6: 1.03, ikke skuddår
const fraDato_6 = new Date('2022-03-01');
const tilDato_6 = new Date('2022-03-07');
const periode_6: Partial<Periode> = {
    id: '6',
    type: Periodetype.Uttak,
    tidsperiode: {
        fom: fraDato_6,
        tom: tilDato_6,
    },
};

//Periode 7: 1.03 i et skuddår
const fraDato_7 = new Date('2024-03-01');
const tilDato_7 = new Date('2024-03-07');
const periode_7: Partial<Periode> = {
    id: '7',
    type: Periodetype.Uttak,
    tidsperiode: {
        fom: fraDato_7,
        tom: tilDato_7,
    },
};

const uttaksplanMedAllePerioder: Periode[] = [
    periode_1,
    periode_2,
    periode_3,
    periode_4,
    periode_5,
    periode_6,
    periode_7,
] as Periode[];

const getUttaksplanUtenPeriode = (removePeriode: Periode): Periode[] => {
    return uttaksplanMedAllePerioder.filter((periode) => periode !== removePeriode);
};

const uttaksplanUtenPeriode_1 = getUttaksplanUtenPeriode(periode_1 as Periode);
const uttaksplanUtenPeriode_2 = getUttaksplanUtenPeriode(periode_2 as Periode);
const uttaksplanUtenPeriode_3 = getUttaksplanUtenPeriode(periode_3 as Periode);
const uttaksplanUtenPeriode_5 = getUttaksplanUtenPeriode(periode_5 as Periode);

describe('getUttaksplanMedFriUtsettelsesperiode', () => {
    it('inserts correct fri utsettelsesperiode that ends on a Friday', () => {
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode(uttaksplanUtenPeriode_1, fraDato_1);
        const friUtsettelsePeriode = nyUttaksplan[0];
        expect(nyUttaksplan.length === uttaksplanMedAllePerioder.length);
        expect(friUtsettelsePeriode.type).toBe(Periodetype.Utsettelse);
        expect(friUtsettelsePeriode.tidsperiode.fom).toEqual(fraDato_1);
        expect(friUtsettelsePeriode.tidsperiode.tom).toEqual(tilDato_1);
    });
    it('inserts correct fri utsettelsesperiode and fills out hole before next periode', () => {
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode(uttaksplanUtenPeriode_2, fraDato_2);
        const friUtsettelsePeriode = nyUttaksplan[1];
        expect(nyUttaksplan.length === uttaksplanMedAllePerioder.length);
        expect(friUtsettelsePeriode.tidsperiode.fom).toEqual(fraDato_2);
        expect(friUtsettelsePeriode.tidsperiode.tom).toEqual(new Date('2022-02-10'));
    });
    it('inserts correct fri utsettelsesperiode that lasts 1 day', () => {
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode(uttaksplanUtenPeriode_3, fraDato_3);
        const friUtsettelsePeriode = nyUttaksplan[2];
        expect(nyUttaksplan.length === uttaksplanMedAllePerioder.length);
        expect(friUtsettelsePeriode.tidsperiode.fom).toEqual(fraDato_3);
        expect(friUtsettelsePeriode.tidsperiode.tom).toEqual(tilDato_3);
    });

    it('inserts correct fri utsettelsesperiode that ends last day of February in a non-leap year', () => {
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode(uttaksplanUtenPeriode_5, fraDato_5);
        const friUtsettelsePeriode = nyUttaksplan[4];
        expect(nyUttaksplan.length === uttaksplanMedAllePerioder.length);
        expect(friUtsettelsePeriode.tidsperiode.fom).toEqual(fraDato_5);
        expect(friUtsettelsePeriode.tidsperiode.tom).toEqual(tilDato_5);
    });

    it('inserts correct fri utsettelsesperiode that ends last day of February in leap year', () => {
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode(
            [...uttaksplanMedAllePerioder],
            new Date('2024-02-27')
        );
        expect(nyUttaksplan.length === uttaksplanMedAllePerioder.length + 1);
        const friUtsettelsePeriode = nyUttaksplan[6];
        expect(friUtsettelsePeriode.type).toBe(Periodetype.Utsettelse);
        expect(friUtsettelsePeriode.tidsperiode.fom).toEqual(new Date('2024-02-27'));
        expect(friUtsettelsePeriode.tidsperiode.tom).toEqual(new Date('2024-02-29'));
    });

    it('inserts correct fri utsettelsesperiode that ends at endringstidspunkt if no periods after', () => {
        const endringstidspunkt = new Date('2024-03-08');
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode([...uttaksplanMedAllePerioder], endringstidspunkt);
        expect(nyUttaksplan.length === uttaksplanMedAllePerioder.length + 1);
        const friUtsettelsePeriode = nyUttaksplan[7];
        expect(friUtsettelsePeriode.type).toBe(Periodetype.Utsettelse);
        expect(friUtsettelsePeriode.tidsperiode.fom).toEqual(endringstidspunkt);
        expect(friUtsettelsePeriode.tidsperiode.tom).toEqual(endringstidspunkt);
    });
});

describe('getPeriodeVedTidspunkt', () => {
    it('returns correct periode that starts at tidspunkt', () => {
        const periode = getPeriodeVedTidspunkt(uttaksplanMedAllePerioder, fraDato_2);
        expect(periode).toEqual(periode_2);
    });

    it('returns undefined when no periode starts at tidspunkt', () => {
        const periodeNotFound = getPeriodeVedTidspunkt(uttaksplanMedAllePerioder, tilDato_2);
        expect(periodeNotFound).toBe(undefined);
    });
});
