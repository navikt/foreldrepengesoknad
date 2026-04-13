import { UttaksplanperiodeMedKunTapteDager, erVanligUttakPeriode } from '../../types/UttaksplanPeriode';

export const filtrerBortAnnenPartsIdentiskePerioder = (
    uttaksplanperiode: UttaksplanperiodeMedKunTapteDager[],
    erFarEllerMedmor: boolean,
) =>
    uttaksplanperiode.reduce<UttaksplanperiodeMedKunTapteDager[]>((alle, periode) => {
        const erSøkersPeriode = erPeriodeForSøker(periode, erFarEllerMedmor);
        const filtrerte = uttaksplanperiode.filter((p) => p.fom === periode.fom && p.tom === periode.tom);
        return filtrerte.length > 1 && !erSøkersPeriode ? alle : alle.concat(periode);
    }, []);

const erPeriodeForSøker = (periode: UttaksplanperiodeMedKunTapteDager, erFarEllerMedmor: boolean) =>
    erVanligUttakPeriode(periode) &&
    ((periode.forelder === 'MOR' && !erFarEllerMedmor) || (periode.forelder === 'FAR_MEDMOR' && erFarEllerMedmor));
