import { AnnenForelder, isAnnenForelderOppgitt } from 'types/AnnenForelder';

import {
    Barn,
    Dekningsgrad,
    FellesUttaksplanDto,
    FellesUttaksplanRequest_fpoversikt,
    isFødtBarn,
} from '@navikt/fp-types';

import { getFamiliehendelsedato, getTermindato } from './barnUtils';

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

// Annen parts perioder uten resultat kan komme fra søkerens egen søknad, så bare perioder med resultat viser annen parts valg.
export const finnAnnenPartsVedtak = (
    uttaksplan: FellesUttaksplanDto | null | undefined,
): FellesUttaksplanDto | undefined =>
    uttaksplan?.perioder.some((p) => p.annenPart?.resultat !== undefined) ? uttaksplan : undefined;

// Annen parts plan bygger på delt uttak og annen parts termindato. Den passer ikke når søkeren oppgir aleneomsorg,
// at annen part ikke har rett, eller en annen termindato, selv om annen part har vedtak.
// En ubehandlet plan bygger i tillegg på kvoter for annen parts dekningsgrad.
export const finnAnnenPartsPlanSomPasserSøknaden = (
    uttaksplan: FellesUttaksplanDto | null | undefined,
    { dekningsgrad, annenForelder, barn }: { dekningsgrad?: Dekningsgrad; annenForelder: AnnenForelder; barn: Barn },
): FellesUttaksplanDto | undefined => {
    const annenPartsPlan = finnAnnenPartsPlan(uttaksplan);
    if (!annenPartsPlan || getErAleneOmOmsorg(annenForelder) || !getIsDeltUttak(annenForelder)) {
        return undefined;
    }
    const termindato = getTermindato(barn);
    if (
        termindato !== undefined &&
        annenPartsPlan.termindato !== undefined &&
        termindato !== annenPartsPlan.termindato
    ) {
        return undefined;
    }
    if (dekningsgrad === undefined || finnAnnenPartsVedtak(annenPartsPlan)) {
        return annenPartsPlan;
    }
    const annenPartsDekningsgrad = annenPartsPlan.dekningsgrad === 'HUNDRE' ? '100' : '80';
    return annenPartsDekningsgrad === dekningsgrad ? annenPartsPlan : undefined;
};

export const annenPartHarInnvilgetUttak = (uttaksplan: FellesUttaksplanDto | null | undefined): boolean => {
    const annenPartsPlan = finnAnnenPartsPlan(uttaksplan);
    if (!annenPartsPlan) {
        return false;
    }
    const harVedtak = finnAnnenPartsVedtak(annenPartsPlan) !== undefined;
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
