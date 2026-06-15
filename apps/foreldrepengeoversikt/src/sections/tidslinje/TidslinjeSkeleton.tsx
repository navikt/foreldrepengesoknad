import { HStack, Skeleton, VStack } from '@navikt/ds-react';

// Stabile nøkler så vi slipper array-index som key. Antallet rader er valgt slik
// at skeleton-høyden ligger nær en typisk tidslinje, for å minimere layout shift
// (CLS) når skeletonet byttes ut med faktisk innhold.
const RADER = ['soknad', 'inntektsmelding', 'vedtak', 'familiehendelse', 'fremtid'];

/**
 * Skeleton som etterligner Aksel <Process> i Tidslinje: en vertikal liste med
 * "hendelser" der hver hendelse har en rund bullet, en tittel-linje og en
 * tidspunkt-linje, samt knappen for å vise hele/kompakt tidslinje nederst.
 */
export const TidslinjeSkeleton = () => (
    <VStack gap="space-16" aria-hidden>
        {RADER.map((id, index) => {
            const erSisteRad = index === RADER.length - 1;
            return (
                <HStack key={id} gap="space-16" align="start" wrap={false}>
                    <VStack align="center" gap="space-1">
                        <Skeleton variant="circle" width={28} height={28} />
                        {!erSisteRad && <Skeleton variant="rounded" width={2} height={44} />}
                    </VStack>
                    <VStack gap="space-2" className="grow pt-1">
                        <Skeleton variant="rounded" width="45%" height={20} />
                        <Skeleton variant="rounded" width="30%" height={16} />
                    </VStack>
                </HStack>
            );
        })}
        <Skeleton variant="rounded" width={140} height={16} />
    </VStack>
);
