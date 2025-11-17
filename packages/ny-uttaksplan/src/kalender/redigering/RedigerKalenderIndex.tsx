import { Box } from '@navikt/ds-react';

import { SaksperiodeNy } from '@navikt/fp-types';
import { CalendarPeriod } from '@navikt/fp-ui';

import { LeggTilEllerEndrePeriodePanel } from './LeggTilEllerEndrePeriodePanel';
import { ValgteDagerPanel } from './ValgteDagerPanel';
import { KalenderRedigeringProvider, useKalenderRedigeringContext } from './context/KalenderRedigeringContext';
import { useMediaActions } from './utils/useMediaActions';

type Props = {
    valgtePerioder: CalendarPeriod[];
    oppdaterUttaksplan: (oppdatertePerioder: SaksperiodeNy[]) => void;
    setValgtePerioder: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>;
};

export const RedigerKalenderIndex = (Props: Props) => (
    <KalenderRedigeringProvider {...Props}>
        <RedigerKalender />
    </KalenderRedigeringProvider>
);

export const RedigerKalender = () => {
    useMediaActions();

    const { erIRedigeringsmodus, erKunEnHelEksisterendePeriodeValgt } = useKalenderRedigeringContext();

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
            {erIRedigeringsmodus && (
                <LeggTilEllerEndrePeriodePanel
                    key={erKunEnHelEksisterendePeriodeValgt ? 1 : 0} // Reset av form når en går fra endre til legg til og omvendt
                />
            )}
            {!erIRedigeringsmodus && <ValgteDagerPanel />}
        </Box.New>
    );
};
