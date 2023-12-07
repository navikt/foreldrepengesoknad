import { AnnenForelder, Periode, isUttaksperiode } from '@navikt/fp-common';
import { shouldPeriodeHaveAttachment } from './manglendeVedleggUtils';

interface HarAktivitetskravIPeriodeUtenUttakParams {
    erDeltUttak: boolean;
    morHarRett: boolean;
    søkerErAleneOmOmsorg: boolean;
}

export const getHarAktivitetskravIPeriodeUtenUttak = ({
    erDeltUttak,
    morHarRett,
    søkerErAleneOmOmsorg,
}: HarAktivitetskravIPeriodeUtenUttakParams) => {
    return !erDeltUttak && !morHarRett && !søkerErAleneOmOmsorg;
};

export const uttaksplanInneholderPerioderUtenKonto = (uttaksplan: Periode[]): boolean => {
    return uttaksplan.find((periode) => isUttaksperiode(periode) && periode.konto === undefined) !== undefined;
};

export const kreverUttaksplanVedlegg = (
    uttaksplan: Periode[],
    erFarEllerMedmor: boolean,
    annenForelder: AnnenForelder,
) => {
    const periodeSomManglerVedlegg = perioderSomKreverVedlegg(uttaksplan, erFarEllerMedmor, annenForelder);

    return periodeSomManglerVedlegg.length > 0;
};

export const perioderSomKreverVedlegg = (
    uttaksplan: Periode[],
    erFarEllerMedmor: boolean,
    annenForelder: AnnenForelder,
) => {
    const perioderSomManglerVedlegg = uttaksplan.filter((p) =>
        shouldPeriodeHaveAttachment(p, erFarEllerMedmor, annenForelder),
    );

    return perioderSomManglerVedlegg;
};
