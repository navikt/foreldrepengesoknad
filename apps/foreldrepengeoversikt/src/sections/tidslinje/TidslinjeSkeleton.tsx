import { HStack, Skeleton, VStack } from '@navikt/ds-react';

import { Ytelse } from '@navikt/fp-types';

// Stabile nøkler så vi slipper array-index som key. Default-tidslinjen viser
// maks 3 hendelser (beregnTidslinjeVindu, maksVindu=3), så vi reserverer 3 rader.
const RADER = ['forste', 'andre', 'tredje'] as const;

// Høyden på linjen mellom bullets styrer radhøyden, og dermed den reserverte
// høyden på skeletonet. FORELDREPENGER har en høyere tidslinje enn
// SVANGERSKAPSPENGER og ENGANGSSTØNAD fordi radene har rikere innhold (f.eks.
// inntektsmelding-dokumenter og 3-års-hendelse). Ved å matche høyden per ytelse
// holder vi layout shift (CLS) lav når skeletonet byttes ut med faktisk innhold.
// Verdiene er målt mot faktisk tidslinje (SVP ≈ 390px med 84px linje).
const LINJE_HOYDE: Record<Ytelse, number> = {
    FORELDREPENGER: 108,
    SVANGERSKAPSPENGER: 84,
    ENGANGSSTØNAD: 84,
};

/**
 * Skeleton som etterligner Aksel <Process> i Tidslinje: en vertikal liste med
 * "hendelser" der hver hendelse har en rund bullet, en tittel-linje og en
 * tidspunkt-linje, samt knappen for å vise hele/kompakt tidslinje nederst.
 *
 * Radhøyden (linjen mellom bullets) avhenger av `ytelse` slik at den reserverte
 * høyden ligger nær den faktiske tidslinjen for den aktuelle ytelsen.
 */
export const TidslinjeSkeleton = ({ ytelse }: { ytelse: Ytelse }) => {
    const linjeHoyde = LINJE_HOYDE[ytelse];

    return (
        <VStack gap="space-16" aria-hidden>
            {RADER.map((id, index) => {
                const erSisteRad = index === RADER.length - 1;
                return (
                    <HStack key={id} gap="space-16" align="start" wrap={false}>
                        <VStack align="center" gap="space-1">
                            <Skeleton variant="circle" width={28} height={28} />
                            {!erSisteRad && <Skeleton variant="rounded" width={2} height={linjeHoyde} />}
                        </VStack>
                        <VStack gap="space-2" className="grow pt-1">
                            <Skeleton variant="rounded" width="45%" height={20} />
                            <Skeleton variant="rounded" width="30%" height={16} />
                        </VStack>
                    </HStack>
                );
            })}
            <Skeleton variant="rounded" width={140} height={32} />
        </VStack>
    );
};
