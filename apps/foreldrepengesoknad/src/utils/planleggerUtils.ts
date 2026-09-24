import { BrukerRolleSak_fpoversikt, PeriodeDto_fpoversikt } from '@navikt/fp-types';

// Planleggeren veit ikkje kven av foreldra som skal søkje, så partane må fordelast på nytt
// når søkjaren si rolle er kjend.
export const fordelPlanleggerPerioderEtterSøker = (
    perioder: PeriodeDto_fpoversikt[],
    søkersForelder: BrukerRolleSak_fpoversikt,
): PeriodeDto_fpoversikt[] =>
    perioder.map((periode) => {
        if (periode.søker?.forelder === periode.annenPart?.forelder) {
            return periode;
        }
        const parter = [periode.søker, periode.annenPart].filter((part) => part !== undefined);
        return {
            ...periode,
            søker: parter.find((part) => part.forelder === søkersForelder),
            annenPart: parter.find((part) => part.forelder !== søkersForelder),
        };
    });
