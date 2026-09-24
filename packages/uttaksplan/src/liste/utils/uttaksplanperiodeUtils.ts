import {
    Uttaksplanperiode,
    erFamiliehendelseDato,
    erPeriodeDto,
    erPeriodeUtenUttakHull,
    erTapteDagerHull,
} from '../../types/UttaksplanPeriode';
import { erAvslåttPeriode, erOppholdsperiode, erPrematuruker, finnParter } from '../../utils/periodeUtils';

export const getFørsteUttaksplanperiodeFom = (uttaksplanperioder: Uttaksplanperiode[]) => {
    return uttaksplanperioder.at(0)!.fom;
};

export const getSisteUttaksplanperiodeTom = (uttaksplanperioder: Uttaksplanperiode[]) => {
    return uttaksplanperioder.at(-1)!.tom;
};

export const erUttaksplanperiodeFamiliehendelseDato = (uttaksplanperioder: Uttaksplanperiode[]) => {
    const periode = uttaksplanperioder.at(0)!;
    return uttaksplanperioder.length === 1 && erFamiliehendelseDato(periode);
};

export const erUttaksplanperiodeTapteDager = (uttaksplanperioder: Uttaksplanperiode[]) => {
    const periode = uttaksplanperioder.at(0)!;
    return uttaksplanperioder.length === 1 && erTapteDagerHull(periode);
};

export const erUttaksplanperiodeUtenUttak = (uttaksplanperioder: Uttaksplanperiode[]) => {
    const periode = uttaksplanperioder.at(0)!;
    return uttaksplanperioder.length === 1 && erPeriodeUtenUttakHull(periode);
};

export const erUttaksplanperiodeSamtidigUttak = (uttaksplanperioder: Uttaksplanperiode[]) => {
    if (uttaksplanperioder.length !== 1) {
        return false;
    }
    const periode = uttaksplanperioder.at(0)!;
    return erPeriodeDto(periode) && !!periode.søker && !!periode.annenPart;
};

export const harUttaksplanperiodePrematuruker = (uttaksplanperioder: Uttaksplanperiode[]) => {
    if (uttaksplanperioder.length !== 1) {
        return false;
    }
    return erPrematuruker(uttaksplanperioder.at(0)!);
};

export const erAlleUttaksplanperioderAvslått = (uttaksplanperioder: Uttaksplanperiode[]) => {
    return (
        uttaksplanperioder.length > 0 &&
        uttaksplanperioder.every(
            (p) =>
                erPeriodeDto(p) &&
                erAvslåttPeriode(p) &&
                finnParter(p).every((part) => part.resultat?.årsak !== 'AVSLAG_FRATREKK_PLEIEPENGER'),
        )
    );
};

export const erUttaksplanperiodeUtsettelseOpphold = (uttaksplanperioder: Uttaksplanperiode[]) => {
    if (uttaksplanperioder.length !== 1) {
        return false;
    }
    const periode = uttaksplanperioder.at(0)!;
    return erPeriodeDto(periode) && erOppholdsperiode(periode);
};

export const getUttaksplanperiodeUtsettelseÅrsak = (uttaksplanperioder: Uttaksplanperiode[]) => {
    if (uttaksplanperioder.length !== 1) {
        return undefined;
    }
    const periode = uttaksplanperioder.at(0)!;
    if (!erPeriodeDto(periode)) {
        return undefined;
    }
    return (periode.søker ?? periode.annenPart)?.utsettelseÅrsak;
};

export const erUttaksplanperiodeUtsettelse = (uttaksplanperioder: Uttaksplanperiode[]) => {
    return !!getUttaksplanperiodeUtsettelseÅrsak(uttaksplanperioder);
};

/**
 * Kva forelder ei rad i lista "tilhøyrer", brukt for tekst/fargevalg. For ei vanleg periode er
 * det forelderen på den sida som finst. For opphald (søkjar manglar uttak, annenPart har det)
 * finst det ingen søkjar-part å lese av – opphald var i den gamle modellen alltid registrert
 * som ein periode for søkjar sjølv (berre med ei anna årsak), så vi fell då tilbake på den
 * innlogga brukaren sin eigen rolle.
 */
export const getUttaksplanperiodeForelder = (uttaksplanperioder: Uttaksplanperiode[]) => {
    if (erUttaksplanperiodeSamtidigUttak(uttaksplanperioder)) {
        return undefined;
    }
    const periode = uttaksplanperioder.at(0)!;
    if (!erPeriodeDto(periode)) {
        return undefined;
    }
    if (periode.søker) {
        return periode.søker.forelder;
    }
    if (periode.annenPart) {
        return periode.annenPart.forelder;
    }
    return undefined;
};

export const erUttaksplanperiodeErForelderMor = (uttaksplanperioder: Uttaksplanperiode[]) => {
    const forelder = getUttaksplanperiodeForelder(uttaksplanperioder);
    return forelder === 'MOR';
};

export const erUttaksplanperiodeEøs = (uttaksplanperioder: Uttaksplanperiode[]) => {
    if (uttaksplanperioder.length !== 1) {
        return false;
    }
    const periode = uttaksplanperioder.at(0)!;
    return erPeriodeDto(periode) && !!periode.annenPartEøs;
};
