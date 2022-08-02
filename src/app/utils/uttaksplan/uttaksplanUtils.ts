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
