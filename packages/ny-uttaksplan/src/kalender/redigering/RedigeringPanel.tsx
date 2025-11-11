import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

import { Box } from '@navikt/ds-react';

import { CalendarPeriod } from '@navikt/fp-ui';
import { useMedia } from '@navikt/fp-utils';

import { Planperiode } from '../../types/Planperiode';
import { InfoOgEnkelRedigeringPanel } from './InfoOgEnkelRedigeringPanel';
import { LeggTilPeriodePanel } from './LeggTilPeriodePanel';

type Props = {
    valgtePerioder: CalendarPeriod[];
    uttaksplan: Planperiode[];
    oppdaterUttaksplan: (oppdatertePerioder: Planperiode[]) => void;
    setValgtePerioder: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>;
};

export const RedigeringPanel = ({ valgtePerioder, uttaksplan, oppdaterUttaksplan, setValgtePerioder }: Props) => {
    const [erIRedigeringsmodus, setErIRedigeringsmodus] = useState(false);
    const [erMinimert, setErMinimert] = useState(false);

    const sammenslåtteValgtePerioder = useMemo(() => slåSammenTilstøtendePerioder(valgtePerioder), [valgtePerioder]);

    // Dette er her for å nullstille minimering når en går fra mobil til desktop
    const isDesktop = useMedia('screen and (min-width: 768px)');
    useEffect(() => {
        if (isDesktop) {
            setErMinimert(false);
        }
    }, [isDesktop]);

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
            {!erIRedigeringsmodus && (
                <InfoOgEnkelRedigeringPanel
                    valgtePerioder={valgtePerioder}
                    komplettPlan={uttaksplan}
                    sammenslåtteValgtePerioder={sammenslåtteValgtePerioder}
                    handleOnPlanChange={oppdaterUttaksplan}
                    setSelectedPeriods={setValgtePerioder}
                    setErIRedigeringsmodus={setErIRedigeringsmodus}
                    erMinimert={erMinimert}
                    setErMinimert={setErMinimert}
                />
            )}
            {erIRedigeringsmodus && (
                <LeggTilPeriodePanel
                    lukk={() => setErIRedigeringsmodus(false)}
                    handleAddPeriode={(nyePerioder) => {
                        oppdaterUttaksplan(nyePerioder);
                        setValgtePerioder([]);
                    }}
                    komplettPlan={uttaksplan}
                    sammenslåtteValgtePerioder={sammenslåtteValgtePerioder}
                    handleOnPlanChange={oppdaterUttaksplan}
                    setSelectedPeriods={setValgtePerioder}
                    valgtePerioder={sammenslåtteValgtePerioder}
                    erMinimert={erMinimert}
                    setErMinimert={setErMinimert}
                />
            )}
        </Box.New>
    );
};

const slåSammenTilstøtendePerioder = (perioder: CalendarPeriod[]): CalendarPeriod[] => {
    if (!perioder.length) {
        return [];
    }

    return [...perioder]
        .sort((a, b) => dayjs(a.fom).diff(dayjs(b.fom)))
        .reduce<CalendarPeriod[]>((acc, curr) => {
            const last = acc[acc.length - 1];

            if (last && dayjs(last.tom).add(1, 'day').isSame(dayjs(curr.fom))) {
                return acc.slice(0, -1).concat({
                    ...curr,
                    fom: last.fom,
                    tom: curr.tom,
                });
            }

            acc.push(curr);
            return acc;
        }, []);
};
