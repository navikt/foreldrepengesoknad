import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat } from 'shared/regler/regelTypes';

import { isUtsettelsesperiode, StønadskontoType } from '../../../types/uttaksplan/periodetyper';
import { beregnGjenståendeUttaksdager } from 'app/util/uttaksPlanStatus';

// Denne regelen sparker inn dersom forelders kvote + fellesperiode er tømt
// Dersom noe er igjen av andre forelders kvote er det OK
export function kanIkkeSlutteMedUtsettelseDersomStønadsdagerErTomme(
    grunnlag: UttaksplanRegelgrunnlag
): RegelTestresultat {
    const { tilgjengeligeStønadskontoer, perioder, søknadsinfo } = grunnlag;
    const { søker } = søknadsinfo;
    const gjenståendeDager = beregnGjenståendeUttaksdager(tilgjengeligeStønadskontoer, perioder, false);
    const sistePeriodeErIkkeUtsettelse =
        perioder.length > 0 ? !isUtsettelsesperiode(perioder[perioder.length - 1]) : false;

    const resterendeFellesperiode = gjenståendeDager.find((konto) => konto.konto === StønadskontoType.Fellesperiode);
    const resterendeMødrekvote = gjenståendeDager.find((konto) => konto.konto === StønadskontoType.Mødrekvote);
    const resterendeFedrekvote = gjenståendeDager.find((konto) => konto.konto === StønadskontoType.Fedrekvote);
    const resterendeForeldrepenger = gjenståendeDager.find((konto) => konto.konto === StønadskontoType.Foreldrepenger);

    if (sistePeriodeErIkkeUtsettelse || perioder.length === 0) {
        return {
            passerer: true,
        };
    }

    if (søker.erFarEllerMedmor) {
        if (resterendeFedrekvote !== undefined && resterendeFellesperiode !== undefined) {
            if (resterendeFedrekvote.dager > 0 || resterendeFellesperiode.dager > 0) {
                return {
                    passerer: true,
                };
            }
        }

        if (resterendeForeldrepenger !== undefined) {
            if (resterendeForeldrepenger.dager > 0) {
                return {
                    passerer: true,
                };
            }
        }

        return {
            passerer: false,
            info: {
                intlKey: 'valideringsfeil.sluttMedUtsettelse',
            },
        };
    } else {
        if (resterendeMødrekvote !== undefined && resterendeFellesperiode !== undefined) {
            if (resterendeMødrekvote.dager > 0 || resterendeFellesperiode.dager > 0) {
                return {
                    passerer: true,
                };
            }
        }

        if (resterendeForeldrepenger !== undefined) {
            if (resterendeForeldrepenger.dager > 0) {
                return {
                    passerer: true,
                };
            }
        }

        return {
            passerer: false,
            info: {
                intlKey: 'valideringsfeil.sluttMedUtsettelse',
            },
        };
    }
}
