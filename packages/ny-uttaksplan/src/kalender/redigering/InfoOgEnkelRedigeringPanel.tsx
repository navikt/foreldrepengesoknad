import dayjs from 'dayjs';
import { uniqueId } from 'lodash';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button, HStack } from '@navikt/ds-react';

import { CalendarPeriod } from '@navikt/fp-ui';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import { InfoPanel } from './InfoPanel';
import { type PlanperiodeMedAntallDager } from './Periodeoversikt';

type Props = {
    valgtePerioder: CalendarPeriod[];
    komplettPlan: Planperiode[];
    sammenslåtteValgtePerioder: CalendarPeriod[];
    handleOnPlanChange: (oppdatertePerioder: Planperiode[]) => void;
    setSelectedPeriods: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>;
    setErIRedigeringsmodus: React.Dispatch<React.SetStateAction<boolean>>;
    erMinimert: boolean;
    setErMinimert: (erMinimert: boolean) => void;
};

export const InfoOgEnkelRedigeringPanel = ({
    valgtePerioder,
    komplettPlan,
    sammenslåtteValgtePerioder,
    handleOnPlanChange,
    setSelectedPeriods,
    setErIRedigeringsmodus,
    erMinimert,
    setErMinimert,
}: Props) => {
    const { erFarEllerMedmor, familiehendelsedato } = useUttaksplanData();

    const slettAllePerioder = () => {
        const planperioder = sammenslåtteValgtePerioder.map<Planperiode>((p) => ({
            forelder: erFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR',
            periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
            fom: p.fom,
            tom: p.tom,
            readOnly: false,
            id: uniqueId(),
        }));

        handleOnPlanChange(planperioder);

        setSelectedPeriods([]);
    };

    const leggTilFerie = () => {
        handleOnPlanChange(
            sammenslåtteValgtePerioder.map<Planperiode>((p) => ({
                forelder: erFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR',
                fom: p.fom,
                tom: p.tom,
                readOnly: false,
                id: uniqueId(),
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
            })),
        );

        setSelectedPeriods([]);
    };

    const ekisterendePerioderSomErValgt = useMemo(
        () => finnValgtePerioder(valgtePerioder, komplettPlan),
        [valgtePerioder, komplettPlan],
    );

    const kanIkkeLeggeTilFerie = valgtePerioder.some((p) => erFerieIkkeLovlig(p, familiehendelsedato));

    //Legg til/endre knapp : Skal stå endre når en har valgt en hel periode, ellers legg til

    return (
        <InfoPanel
            valgtePerioder={valgtePerioder}
            komplettPlan={komplettPlan}
            sammenslåtteValgtePerioder={sammenslåtteValgtePerioder}
            handleOnPlanChange={handleOnPlanChange}
            setSelectedPeriods={setSelectedPeriods}
            erMinimert={erMinimert}
            setErMinimert={setErMinimert}
            skalVisePeriodedetaljerSomStandard
        >
            <Button variant="primary" size="small" onClick={() => setErIRedigeringsmodus(true)} type="button">
                <FormattedMessage id="RedigeringPanel.RedigerUttaksplan" />
            </Button>
            <HStack justify="space-between">
                {!kanIkkeLeggeTilFerie && (
                    <Button variant="secondary" size="small" onClick={leggTilFerie} type="button">
                        <FormattedMessage id="RedigeringPanel.LeggInnFerie" />
                    </Button>
                )}
                {ekisterendePerioderSomErValgt.length > 0 && (
                    <Button variant="tertiary" size="small" onClick={slettAllePerioder} type="button">
                        <FormattedMessage id="RedigeringPanel.SlettAlle" />
                    </Button>
                )}
            </HStack>
        </InfoPanel>
    );
};

const finnValgtePerioder = (perioder: CalendarPeriod[], komplettPlan: Planperiode[]): PlanperiodeMedAntallDager[] => {
    return komplettPlan
        .map((p) => {
            let overlappendeDager = 0;

            const overlappendePerioder = perioder.filter((periode) => {
                const fom1 = dayjs(periode.fom);
                const tom1 = dayjs(periode.tom);
                const fom2 = dayjs(p.fom);
                const tom2 = dayjs(p.tom);

                const start = fom1.isAfter(fom2) ? fom1 : fom2;
                const end = tom1.isBefore(tom2) ? tom1 : tom2;

                if (start.isSameOrBefore(end, 'day')) {
                    overlappendeDager += end.diff(start, 'day') + 1;
                    return true;
                }
                return false;
            });

            if (overlappendeDager > 0) {
                const fomDate = overlappendePerioder
                    .map(({ fom }) => dayjs(fom))
                    .reduce((min, curr) => (curr.isBefore(min) ? curr : min))
                    .format('YYYY-MM-DD');
                const tomDate = overlappendePerioder
                    .map(({ tom }) => dayjs(tom))
                    .reduce((max, curr) => (curr.isAfter(max) ? curr : max))
                    .format('YYYY-MM-DD');

                return { ...p, fom: fomDate, tom: tomDate, overlappendeDager };
            }

            return null;
        })
        .filter((p): p is PlanperiodeMedAntallDager => p !== null)
        .reduce<PlanperiodeMedAntallDager[]>((acc, curr) => {
            const duplikat = acc.find((p) => p.kontoType === curr.kontoType);
            if (duplikat) {
                return acc
                    .filter((p) => p.kontoType !== duplikat.kontoType)
                    .concat({
                        ...duplikat,
                        // Keep earliest fom and latest tom across all merged periods
                        fom: dayjs(duplikat.fom).isBefore(dayjs(curr.fom)) ? duplikat.fom : curr.fom,
                        tom: dayjs(duplikat.tom).isAfter(dayjs(curr.tom)) ? duplikat.tom : curr.tom,
                        overlappendeDager: duplikat.overlappendeDager + curr.overlappendeDager,
                    });
            }
            return acc.concat(curr);
        }, []);
};

const erFerieIkkeLovlig = (periode: { fom: string; tom: string }, familiehendelsedato: string): boolean => {
    return dayjs(periode.tom).isBefore(familiehendelsedato);
};
