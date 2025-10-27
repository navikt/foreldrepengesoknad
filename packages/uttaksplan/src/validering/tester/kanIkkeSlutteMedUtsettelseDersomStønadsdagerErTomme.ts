import { Søknadsinfo, isUtsettelsesperiode } from '@navikt/fp-common';

import { beregnGjenståendeUttaksdager } from '../../utils/uttaksPlanStatus';
import { RegelTestresultat } from '../utils/types/regelTypes';

// Denne regelen sparker inn dersom forelders kvote + fellesperiode er tømt
// Dersom noe er igjen av andre forelders kvote er det OK
export function kanIkkeSlutteMedUtsettelseDersomStønadsdagerErTomme(grunnlag: Søknadsinfo): RegelTestresultat {
    const { perioder, søkerErFarEllerMedmor, stønadskontoer } = grunnlag;
    const gjenståendeDager = beregnGjenståendeUttaksdager(stønadskontoer, perioder, false);
    const sistePeriodeErIkkeUtsettelse = perioder.length > 0 ? !isUtsettelsesperiode(perioder.at(-1)!) : false;

    const resterendeFellesperiode = gjenståendeDager.find((konto) => konto.konto === 'FELLESPERIODE');
    const resterendeMødrekvote = gjenståendeDager.find((konto) => konto.konto === 'MØDREKVOTE');
    const resterendeFedrekvote = gjenståendeDager.find((konto) => konto.konto === 'FEDREKVOTE');
    const resterendeForeldrepenger = gjenståendeDager.find((konto) => konto.konto === 'FORELDREPENGER');

    if (sistePeriodeErIkkeUtsettelse || perioder.length === 0) {
        return {
            passerer: true,
        };
    }

    if (søkerErFarEllerMedmor) {
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
                intlKey: 'uttaksplan.validering.feil.sluttMedUtsettelse',
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
                intlKey: 'uttaksplan.validering.feil.sluttMedUtsettelse',
            },
        };
    }
}
