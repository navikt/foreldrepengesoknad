import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { AnnenForelder, NavnPåForeldre, Søkerrolle, isAnnenForelderOppgitt } from '@navikt/fp-common';
import { Kjønn_fpoversikt, PersonDto_fpoversikt } from '@navikt/fp-types';

export const formaterNavn = (fornavn: string, etternavn: string, visEtternavn: boolean, mellomnavn?: string) => {
    if (visEtternavn) {
        return mellomnavn ? `${fornavn} ${mellomnavn} ${etternavn}` : `${fornavn} ${etternavn}`;
    }
    return mellomnavn ? `${fornavn} ${mellomnavn}` : `${fornavn}`;
};

export const getKjønnFromFnr = (annenForelder: AnnenForelder): Kjønn_fpoversikt | undefined => {
    if (isAnnenForelderOppgitt(annenForelder)) {
        const { fnr } = annenForelder;

        if (fnr === undefined || fnr.length !== 11) {
            return undefined;
        }
        return Number.parseInt(fnr.charAt(8), 10) % 2 === 0 ? 'K' : 'M';
    }

    return undefined;
};

export const getKjønnFromFnrString = (fnr: string): Kjønn_fpoversikt | undefined => {
    if (fnr.length !== 11) {
        return undefined;
    }
    return Number.parseInt(fnr.charAt(8), 10) % 2 === 0 ? 'K' : 'M';
};

export const getKunFarHarRett = (
    erFarEllerMedmor: boolean,
    annenForelder: AnnenForelder,
    søkerErAleneOmOmsorg: boolean,
) => {
    return (
        erFarEllerMedmor &&
        isAnnenForelderOppgitt(annenForelder) &&
        !søkerErAleneOmOmsorg &&
        !annenForelder.harRettPåForeldrepengerINorge &&
        !annenForelder.harRettPåForeldrepengerIEØS
    );
};

export const getMorErAleneOmOmsorg = (
    søkerErMor: boolean,
    søkerErAleneOmOmsorg: boolean,
    annenForelder: AnnenForelder,
) => {
    return søkerErMor && (søkerErAleneOmOmsorg || annenForelder.kanIkkeOppgis === true);
};

export const getMorHarRettPåForeldrepengerINorgeEllerEØS = (
    rolle: Søkerrolle,
    søkerErFarEllerMedmor: boolean,
    annenForelder: AnnenForelder,
) => {
    if (søkerErFarEllerMedmor === true && isAnnenForelderOppgitt(annenForelder)) {
        return (
            annenForelder.harRettPåForeldrepengerINorge === true || annenForelder.harRettPåForeldrepengerIEØS === true
        );
    }
    return rolle === 'mor';
};

export const getFarMedmorErAleneOmOmsorg = (
    søkerErFarMedmor: boolean,
    søkerErAleneOmOmsorg: boolean,
    annenForelder: AnnenForelder,
) => {
    return søkerErFarMedmor && (søkerErAleneOmOmsorg || annenForelder.kanIkkeOppgis === true);
};

export const getNavnPåForeldre = (
    person: PersonDto_fpoversikt,
    annenForelder: AnnenForelder,
    erFarEllerMedmor: boolean,
    intl: IntlShape,
): NavnPåForeldre => {
    const navnSøker = person.navn.fornavn;
    const navnAnnenForelder =
        isAnnenForelderOppgitt(annenForelder) && annenForelder.fornavn !== undefined && annenForelder.fornavn !== ''
            ? annenForelder.fornavn
            : intl.formatMessage({ id: 'annen.forelder' });
    const navnMor = erFarEllerMedmor ? navnAnnenForelder : navnSøker;
    const navnFarMedmor = erFarEllerMedmor ? navnSøker : navnAnnenForelder;

    return {
        mor: navnMor,
        farMedmor: navnFarMedmor,
    };
};

export const getErSøkerFarEllerMedmor = (søkerRolle: Søkerrolle): boolean =>
    søkerRolle === 'far' || søkerRolle === 'medmor';

export const erEldreEnn3ÅrOg3Måneder = (fødselsdato: string) => {
    return dayjs(fødselsdato).add(3, 'year').add(3, 'month').isBefore(dayjs(), 'day');
};
