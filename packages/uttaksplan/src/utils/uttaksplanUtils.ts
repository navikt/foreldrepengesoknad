import { Periode, isUttaksperiode } from '@navikt/fp-common';

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
