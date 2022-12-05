import { intlUtils, Kjønn } from '@navikt/fp-common';
import { formatDate } from '@navikt/fp-common';
import AnnenForelder, { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import Person from 'app/types/Person';
import { Søkerrolle } from 'app/types/Søkerrolle';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

export const formaterNavn = (fornavn: string, etternavn: string, mellomnavn?: string) => {
    return mellomnavn ? `${fornavn} ${mellomnavn} ${etternavn}` : `${fornavn} ${etternavn}`;
};

export const formaterNavnPåFlereBarn = (
    fornavn: string[] | undefined,
    etternavn: string[] | undefined,
    fødselsdatoer: Date[] | undefined,
    intl: IntlShape
): string => {
    if (fornavn === undefined || fornavn.length === 0 || etternavn === undefined || etternavn.length === 0) {
        const fødselsdatoTekst = formateFødselsdatoerPåFlereBarn(fødselsdatoer);
        return fødselsdatoer !== undefined && fødselsdatoer.length > 0
            ? intlUtils(intl, 'velkommen.barnVelger.fødtBarn.ettBarn', {
                  fødselsdato: fødselsdatoTekst,
              })
            : '';
    }

    const etterNavnet = etternavn[0];
    if (fornavn.length > 1) {
        const fornavnene = fornavn.slice(0, -1).join(', ');
        const sisteFornavn = fornavn[fornavn.length - 1];
        return `${fornavnene} og ${sisteFornavn} ${etterNavnet}`;
    }
    return `${fornavn[0]} ${etternavn}`;
};

export const formateFødselsdatoerPåFlereBarn = (fødselsdatoer: Date[] | undefined): string | undefined => {
    if (fødselsdatoer === undefined) {
        return undefined;
    }
    const unikeFødselsdatoer = [] as Date[];
    fødselsdatoer.forEach((f) => {
        const finnesIUnikeFødselsdatoer = unikeFødselsdatoer.find((dato) => dayjs(dato).isSame(f, 'day'));
        if (finnesIUnikeFødselsdatoer === undefined) {
            unikeFødselsdatoer.push(f);
        }
    });

    if (unikeFødselsdatoer.length > 1) {
        const fødselsdatoerTekst = unikeFødselsdatoer.map((fd) => formatDate(fd));
        const førsteFødselsdaoer = fødselsdatoerTekst.slice(0, -1).join(', ');
        const sisteFødselsdato = fødselsdatoerTekst[fødselsdatoerTekst.length - 1];
        return `${førsteFødselsdaoer} og ${sisteFødselsdato}`;
    }
    return formatDate(unikeFødselsdatoer[0]);
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

export const erEldreEnn3År = (fødselsdato: Date) => {
    return dayjs(fødselsdato).add(3, 'year').isBefore(dayjs(), 'day');
};
