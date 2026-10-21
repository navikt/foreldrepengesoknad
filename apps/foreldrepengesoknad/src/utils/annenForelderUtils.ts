import { AnnenForelder, isAnnenForelderOppgitt } from 'types/AnnenForelder';

import { Barn, FellesUttaksplanDto, FellesUttaksplanRequest_fpoversikt, isFødtBarn } from '@navikt/fp-types';

import { getFamiliehendelsedato } from './barnUtils';

export const getErAleneOmOmsorg = (annenForelder: AnnenForelder): boolean => {
    return isAnnenForelderOppgitt(annenForelder) ? annenForelder.erAleneOmOmsorg : true;
};

export const getDatoForAleneomsorg = (annenForelder: AnnenForelder): string | undefined => {
    return isAnnenForelderOppgitt(annenForelder) ? annenForelder.datoForAleneomsorg : undefined;
};

export const finnAnnenPartsPlan = (
    uttaksplan: FellesUttaksplanDto | null | undefined,
): FellesUttaksplanDto | undefined =>
    uttaksplan?.perioder.some((p) => p.annenPart !== undefined) ? uttaksplan : undefined;

export const annenPartHarInnvilgetUttak = (uttaksplan: FellesUttaksplanDto | null | undefined): boolean => {
    const annenPartsPlan = finnAnnenPartsPlan(uttaksplan);
    if (!annenPartsPlan) {
        return false;
    }
    const harVedtak = annenPartsPlan.perioder.some((p) => p.annenPart?.resultat !== undefined);
    return !harVedtak || annenPartsPlan.perioder.some((p) => p.annenPart?.resultat?.innvilget);
};

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
