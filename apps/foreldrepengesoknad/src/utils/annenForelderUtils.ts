import { AnnenForelder, isAnnenForelderOppgitt } from 'types/AnnenForelder';

import { Barn, FellesUttaksplanDto_fpoversikt, FellesUttaksplanRequest_fpoversikt, isFødtBarn } from '@navikt/fp-types';

import { getFamiliehendelsedato } from './barnUtils';

export const getErAleneOmOmsorg = (annenForelder: AnnenForelder): boolean => {
    return isAnnenForelderOppgitt(annenForelder) ? annenForelder.erAleneOmOmsorg : true;
};

export const getDatoForAleneomsorg = (annenForelder: AnnenForelder): string | undefined => {
    return isAnnenForelderOppgitt(annenForelder) ? annenForelder.datoForAleneomsorg : undefined;
};

// Planen kan òg innehalde annan part sin ubehandla søknad. Berre periodar med resultat kjem frå eit vedtak.
export const annenPartHarVedtak = (
    uttaksplan: FellesUttaksplanDto_fpoversikt | null | undefined,
): uttaksplan is FellesUttaksplanDto_fpoversikt =>
    !!uttaksplan?.perioder.some((p) => p.annenPart?.resultat !== undefined);

export const annenPartHarInnvilgetUttak = (uttaksplan: FellesUttaksplanDto_fpoversikt | null | undefined): boolean =>
    !!uttaksplan?.perioder.some((p) => p.annenPart?.resultat?.innvilget);

export const annenForelderHarNorskFnr = (annenForelder: AnnenForelder) => {
    const annenPartFnr =
        isAnnenForelderOppgitt(annenForelder) && annenForelder.utenlandskFnr !== true ? annenForelder.fnr : undefined;
    return annenPartFnr !== undefined && annenPartFnr !== '';
};

export const getUttaksplanParam = (annenForelder: AnnenForelder, barn: Barn): FellesUttaksplanRequest_fpoversikt => ({
    barnIdentifikator: {
        fødselsnummer: isFødtBarn(barn) && barn.fnr !== undefined && barn.fnr.length > 0 ? barn.fnr[0] : undefined,
        familiehendelse: getFamiliehendelsedato(barn),
    },
    annenPartFødselsnummer:
        annenForelderHarNorskFnr(annenForelder) && isAnnenForelderOppgitt(annenForelder)
            ? annenForelder.fnr
            : undefined,
});

export const getIsDeltUttak = (annenForelder: AnnenForelder): boolean => {
    return isAnnenForelderOppgitt(annenForelder)
        ? !!annenForelder.harRettPåForeldrepengerINorge || !!annenForelder.harRettPåForeldrepengerIEØS
        : false;
};

export const getErMorUfør = (annenForelder: AnnenForelder, erFarEllerMedmor: boolean) => {
    if (erFarEllerMedmor && isAnnenForelderOppgitt(annenForelder)) {
        return !!annenForelder.erMorUfør;
    }

    return false;
};
