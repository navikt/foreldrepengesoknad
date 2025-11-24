import { FormattedMessage } from 'react-intl';

import { Box, VStack } from '@navikt/ds-react';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { CalendarPeriod } from '@navikt/fp-ui';

import { KvoteOppsummeringsTittel } from '../../KvoteOppsummering';
import { UttaksplanHandlingKnapper } from '../../components/UttaksplanHandlingKnapper';
import { LeggTilEllerEndrePeriodePanel } from './LeggTilEllerEndrePeriodePanel';
import { ValgteDagerPanel } from './ValgteDagerPanel';
import { KalenderRedigeringProvider, useKalenderRedigeringContext } from './context/KalenderRedigeringContext';
import { useMediaActions } from './utils/useMediaActions';

type Props = {
    valgtePerioder: CalendarPeriod[];
    oppdaterUttaksplan: (
        oppdatertePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    ) => void;
    setValgtePerioder: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>;
    endreUttaksplan: (handling: 'angre' | 'tilbakestill' | 'fjernAlt') => void;
};

export const RedigerKalenderIndex = (props: Props) => (
    <KalenderRedigeringProvider {...props}>
        <RedigerKalender />
    </KalenderRedigeringProvider>
);

export const RedigerKalender = () => {
    useMediaActions();

    const { erIRedigeringsmodus, erKunEnHelEksisterendePeriodeValgt, sammenslåtteValgtePerioder, endreUttaksplan } =
        useKalenderRedigeringContext();

    return (
        <Box.New
            borderWidth="1"
            borderRadius="4"
            borderColor="neutral-subtle"
            height="fit-content"
            maxHeight={erIRedigeringsmodus ? '100vh' : 'none'}
            overflow={erIRedigeringsmodus ? 'auto' : 'hidden'}
            background="default"
        >
            {sammenslåtteValgtePerioder.length === 0 && (
                <VStack gap="space-16">
                    <Box.New background="accent-soft" padding="4">
                        <FormattedMessage id="RedigeringKalenderIndex.VelgDatoerIKalender" />
                    </Box.New>
                    <VStack gap="space-16" className="px-4 pb-4">
                        <UttaksplanHandlingKnapper
                            visKnapper={false}
                            tilbakestillPlan={() => endreUttaksplan('tilbakestill')}
                            angreEndring={() => endreUttaksplan('angre')}
                            fjernAltIPlanen={() => endreUttaksplan('fjernAlt')}
                        />
                        <KvoteOppsummeringsTittel visStatusIkoner={false} brukEnkelVisning />
                        <FormattedMessage id="RedigeringKalenderIndex.SeDetaljer" />
                    </VStack>
                </VStack>
            )}
            {sammenslåtteValgtePerioder.length > 0 && (
                <>
                    {erIRedigeringsmodus && (
                        <LeggTilEllerEndrePeriodePanel
                            key={erKunEnHelEksisterendePeriodeValgt ? 1 : 0} // Reset av form når en går fra endre til legg til og omvendt
                        />
                    )}
                    {!erIRedigeringsmodus && <ValgteDagerPanel />}
                </>
            )}
        </Box.New>
    );
};
