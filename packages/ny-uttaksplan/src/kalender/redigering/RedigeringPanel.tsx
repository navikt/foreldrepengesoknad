import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

import { Box } from '@navikt/ds-react';

import { SaksperiodeNy } from '@navikt/fp-types';
import { CalendarPeriod } from '@navikt/fp-ui';
import { omitMany, useMedia } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { useUttaksplanBuilder } from '../../context/useUttaksplanBuilder';
import { Planperiode } from '../../types/Planperiode';
import { isHull, isPeriodeUtenUttak } from '../../utils/periodeUtils';
import { InfoOgEnkelRedigeringPanel } from './InfoOgEnkelRedigeringPanel';
import { LeggTilEllerEndrePeriodePanel } from './LeggTilEllerEndrePeriodePanel';

type Props = {
    valgtePerioder: CalendarPeriod[];
    oppdaterUttaksplan: (oppdatertePerioder: SaksperiodeNy[]) => void;
    setValgtePerioder: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>;
};

export const RedigeringPanel = ({ valgtePerioder, oppdaterUttaksplan, setValgtePerioder }: Props) => {
    const { uttaksplan } = useUttaksplanData();

    const [erIRedigeringsmodus, setErIRedigeringsmodus] = useState(false);
    const [erMinimert, setErMinimert] = useState(false);

    const uttaksplanBuilder = useUttaksplanBuilder();

    const sammenslåtteValgtePerioder = useMemo(() => slåSammenTilstøtendePerioder(valgtePerioder), [valgtePerioder]);

    const erKunEnHelEksisterendePeriodeValgt =
        sammenslåtteValgtePerioder.length === 1 &&
        erValgtPeriodeEnHelEksisterendePeriode(uttaksplan, sammenslåtteValgtePerioder[0]);

    const oppdater = (oppdatertPeriode: Planperiode[]) => {
        const planperioder = erKunEnHelEksisterendePeriodeValgt
            ? uttaksplanBuilder.oppdaterPerioder(oppdatertPeriode)
            : uttaksplanBuilder.leggTilPerioder(oppdatertPeriode);
        const resultUtenHull = planperioder.filter((p) => !isHull(p) && !isPeriodeUtenUttak(p));

        oppdaterUttaksplan(
            resultUtenHull.map((p) => omitMany(p, ['id', 'periodeHullÅrsak', 'readOnly', 'skalIkkeHaUttakFørTermin'])),
        );
    };

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
                    sammenslåtteValgtePerioder={sammenslåtteValgtePerioder}
                    erMinimert={erMinimert}
                    erKunEnHelEksisterendePeriodeValgt={erKunEnHelEksisterendePeriodeValgt}
                    oppdaterUttaksplan={oppdater}
                    setValgtePerioder={setValgtePerioder}
                    setErIRedigeringsmodus={setErIRedigeringsmodus}
                    setErMinimert={setErMinimert}
                />
            )}
            {erIRedigeringsmodus && (
                <LeggTilEllerEndrePeriodePanel
                    key={erKunEnHelEksisterendePeriodeValgt ? 1 : 0} // Reset av form når en går fra endre til legg til og omvendt
                    valgtePerioder={sammenslåtteValgtePerioder}
                    sammenslåtteValgtePerioder={sammenslåtteValgtePerioder}
                    erMinimert={erMinimert}
                    erKunEnHelEksisterendePeriodeValgt={erKunEnHelEksisterendePeriodeValgt}
                    oppdaterUttaksplan={oppdater}
                    setValgtePerioder={setValgtePerioder}
                    lukkRedigeringsmodus={() => setErIRedigeringsmodus(false)}
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

            if (last) {
                const sisteDag = dayjs(last.tom);
                const nesteStart = dayjs(curr.fom);

                // Finn første virkedag etter forrige periode
                let nesteVirkedag = sisteDag.add(1, 'day');
                while (nesteVirkedag.day() === 6 || nesteVirkedag.day() === 0) {
                    nesteVirkedag = nesteVirkedag.add(1, 'day');
                }

                if (nesteVirkedag.isSame(nesteStart, 'day')) {
                    // slå sammen
                    return acc.slice(0, -1).concat({
                        ...curr,
                        fom: last.fom,
                        tom: curr.tom,
                    });
                }
            }

            acc.push(curr);
            return acc;
        }, []);
};

const erValgtPeriodeEnHelEksisterendePeriode = (uttaksplan: Planperiode[], valgtPeriode: CalendarPeriod) =>
    uttaksplan.some(
        (p) =>
            dayjs(p.fom).isSame(dayjs(valgtPeriode.fom), 'day') && dayjs(p.tom).isSame(dayjs(valgtPeriode.tom), 'day'),
    );
