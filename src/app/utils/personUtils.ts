import { Kjønn } from '@navikt/fp-common';
import AnnenForelder, { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import Person from 'app/types/Person';
import { Søkerrolle } from 'app/types/Søkerrolle';

export const formaterNavn = (fornavn: string, etternavn: string, mellomnavn?: string) => {
    return mellomnavn ? `${fornavn} ${mellomnavn} ${etternavn}` : `${fornavn} ${etternavn}`;
};

const navnSlutterPåSLyd = (navn: string): boolean => {
    const sisteBokstav = navn.charAt(navn.length - 1).toLowerCase();
    return sisteBokstav === 's' || sisteBokstav === 'x' || sisteBokstav === 'z';
};

export const getNavnGenitivEierform = (navn: string, locale: string): string => {
    if (locale !== 'nb') {
        return navn;
    }
    if (navnSlutterPåSLyd(navn)) {
        return `${navn}'`;
    }
    return `${navn}s`;
};

export const getKjønnFromFnr = (annenForelder: AnnenForelder): Kjønn | undefined => {
    if (isAnnenForelderOppgitt(annenForelder)) {
        const { fnr } = annenForelder;

        if (fnr === undefined || fnr.length !== 11) {
            return undefined;
        }
        return parseInt(fnr.charAt(8), 10) % 2 === 0 ? 'K' : 'M';
    }

    return undefined;
};

export const getKjønnFromFnrString = (fnr: string): Kjønn | undefined => {
    if (fnr.length !== 11) {
        return undefined;
    }
    return parseInt(fnr.charAt(8), 10) % 2 === 0 ? 'K' : 'M';
};

export const getMorErAleneOmOmsorg = (
    søkerErMor: boolean,
    søkerErAleneOmOmsorg: boolean,
    annenForelder: AnnenForelder
) => {
    return søkerErMor && (søkerErAleneOmOmsorg || annenForelder.kanIkkeOppgis === true);
};

export const getMorHarRettPåForeldrepengerINorgeEllerEØS = (
    rolle: Søkerrolle,
    søkerErFarEllerMedmor: boolean,
    annenForelder: AnnenForelder
) => {
    if (søkerErFarEllerMedmor === true && isAnnenForelderOppgitt(annenForelder)) {
        return (
            annenForelder.harRettPåForeldrepengerINorge === true || annenForelder.harRettPåForeldrepengerIEØS === true
        );
    }
    return rolle === 'mor';
};

export const getMorHarRettPåForeldrepengerIEØS = (
    rolle: Søkerrolle,
    søkerErFarEllerMedmor: boolean,
    annenForelder: AnnenForelder
) => {
    if (søkerErFarEllerMedmor === true && isAnnenForelderOppgitt(annenForelder)) {
        return annenForelder.harRettPåForeldrepengerINorge === true;
    }
    return rolle === 'mor';
};

export const getFarMedmorErAleneOmOmsorg = (
    søkerErFarMedmor: boolean,
    søkerErAleneOmOmsorg: boolean,
    annenForelder: AnnenForelder
) => {
    return søkerErFarMedmor && (søkerErAleneOmOmsorg || annenForelder.kanIkkeOppgis === true);
};

export const getNavnPåForeldre = (
    person: Person,
    annenForelder: AnnenForelder,
    erFarEllerMedmor: boolean
): NavnPåForeldre => {
    const navnSøker = person.fornavn;
    const navnAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder.fornavn : '';
    const navnMor = erFarEllerMedmor ? navnAnnenForelder : navnSøker;
    const navnFarMedmor = erFarEllerMedmor ? navnSøker : navnAnnenForelder;

    return {
        mor: navnMor,
        farMedmor: navnFarMedmor,
    };
};

export const getErSøkerFarEllerMedmor = (søkerRolle: Søkerrolle): boolean =>
    søkerRolle === 'far' || søkerRolle === 'medmor';
