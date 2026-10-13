import { BrukerRolleSak_fpoversikt, UttakPeriodeDto } from '@navikt/fp-types';

// Planleggeren veit ikkje kven av foreldra som skal søkje, så partane må fordelast på nytt
// når søkjaren si rolle er kjend.
export const fordelPlanleggerPerioderEtterSøker = (
    perioder: UttakPeriodeDto[],
    søkersForelder: BrukerRolleSak_fpoversikt,
): UttakPeriodeDto[] =>
    perioder.map((periode) => {
        if (periode.søker?.forelder === periode.annenPart?.forelder) {
            return periode;
        }
        const alleUttak = [periode.søker, periode.annenPart].filter((uttak) => uttak !== undefined);
        return {
            ...periode,
            søker: alleUttak.find((uttak) => uttak.forelder === søkersForelder),
            annenPart: alleUttak.find((uttak) => uttak.forelder !== søkersForelder),
        };
    });
