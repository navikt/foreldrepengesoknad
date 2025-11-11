import { ChevronDownIcon, ChevronUpIcon, PencilIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { uniqueId } from 'lodash';
import { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, Box, HStack, Heading, Show, Spacer, VStack } from '@navikt/ds-react';

import { DDMMM_DATE_FORMAT } from '@navikt/fp-constants';
import { CalendarPeriod } from '@navikt/fp-ui';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import { Periodeoversikt, type PlanperiodeMedAntallDager } from './Periodeoversikt';

type Props = {
    valgtePerioder: CalendarPeriod[];
    komplettPlan: Planperiode[];
    sammenslåtteValgtePerioder: CalendarPeriod[];
    handleOnPlanChange: (oppdatertePerioder: Planperiode[]) => void;
    setSelectedPeriods: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>;
    erMinimert: boolean;
    setErMinimert: (erMinimert: boolean) => void;
    skalVisePeriodedetaljerSomStandard: boolean;
    children: React.ReactNode[] | React.ReactNode;
};

export const InfoPanel = ({
    valgtePerioder,
    komplettPlan,
    sammenslåtteValgtePerioder,
    handleOnPlanChange,
    setSelectedPeriods,
    erMinimert,
    setErMinimert,
    skalVisePeriodedetaljerSomStandard,
    children,
}: Props) => {
    const [visPeriodeDetaljer, setVisPeriodeDetaljer] = useState(skalVisePeriodedetaljerSomStandard);

    const { erFarEllerMedmor, familiehendelsedato } = useUttaksplanData();

    const slettPeriode = (periode: { fom: string; tom: string }) => {
        const start = dayjs(periode.fom);
        const end = dayjs(periode.tom);

        const perioder = sammenslåtteValgtePerioder.filter((p) => {
            const pStart = dayjs(p.fom);
            const pEnd = dayjs(p.tom);

            return start.isSameOrBefore(pEnd, 'day') && end.isSameOrAfter(pStart, 'day');
        });

        handleOnPlanChange(
            perioder.map<Planperiode>((p) => ({
                forelder: erFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR',
                periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
                fom: p.fom,
                tom: p.tom,
                readOnly: false,
                id: uniqueId(),
            })),
        );

        setSelectedPeriods((oldPeriods) =>
            oldPeriods.filter(
                (p) =>
                    !perioder.some(
                        (rp) => dayjs(p.fom).isSameOrBefore(rp.tom, 'day') && dayjs(p.tom).isSameOrAfter(rp.fom, 'day'),
                    ),
            ),
        );
    };

    const ekisterendePerioderSomErValgt = useMemo(
        () => finnValgtePerioder(valgtePerioder, komplettPlan),
        [valgtePerioder, komplettPlan],
    );

    const kanIkkeLeggeTilFerie = valgtePerioder.some((p) => erFerieIkkeLovlig(p, familiehendelsedato));
    const harValgtPerioderBådeFørOgEtterFamiliehendelsedato = harValgtBådeFørOgEtterFamiliehendelsedato(
        valgtePerioder,
        familiehendelsedato,
    );

    return (
        <>
            <VStack gap="space-8">
                <Box.New background="accent-soft" padding="4">
                    <VStack gap="space-8">
                        <HStack gap="space-8" align="center" wrap={false}>
                            <PencilIcon title="a11y-title" fontSize="1.5rem" />
                            <Heading size="xsmall">
                                <FormattedMessage id="RedigeringPanel.EndreTil" />
                            </Heading>
                            <Spacer />
                            <Show below="md" asChild>
                                {erMinimert ? (
                                    <ChevronUpIcon
                                        title="a11y-title"
                                        fontSize="1.5rem"
                                        onClick={() => setErMinimert(false)}
                                    />
                                ) : (
                                    <ChevronDownIcon
                                        title="a11y-title"
                                        fontSize="1.5rem"
                                        onClick={() => setErMinimert(true)}
                                    />
                                )}
                            </Show>
                        </HStack>
                        <HStack justify="space-between" align="center" wrap={false}>
                            <BodyShort>
                                <FormattedMessage
                                    id="RedigeringPanel.ValgteDager"
                                    values={{ antall: finnAntallDager(valgtePerioder) }}
                                />
                            </BodyShort>
                            {!skalVisePeriodedetaljerSomStandard && (
                                <Show above="md" asChild>
                                    {visPeriodeDetaljer ? (
                                        <ChevronUpIcon
                                            title="a11y-title"
                                            fontSize="1.5rem"
                                            onClick={() => setVisPeriodeDetaljer(false)}
                                        />
                                    ) : (
                                        <ChevronDownIcon
                                            title="a11y-title"
                                            fontSize="1.5rem"
                                            onClick={() => setVisPeriodeDetaljer(true)}
                                        />
                                    )}
                                </Show>
                            )}
                        </HStack>
                        {!skalVisePeriodedetaljerSomStandard && visPeriodeDetaljer && (
                            <Detaljer
                                ekisterendePerioderSomErValgt={ekisterendePerioderSomErValgt}
                                slettPeriode={slettPeriode}
                                erMinimert={false}
                            />
                        )}
                    </VStack>
                </Box.New>
                <VStack gap="space-16" className="p-4">
                    {skalVisePeriodedetaljerSomStandard && visPeriodeDetaljer && (
                        <Detaljer
                            ekisterendePerioderSomErValgt={ekisterendePerioderSomErValgt}
                            slettPeriode={slettPeriode}
                            erMinimert={erMinimert}
                        />
                    )}
                    <div className={erMinimert ? 'hidden' : 'block'}>
                        <VStack gap="space-16">
                            {kanIkkeLeggeTilFerie && !harValgtPerioderBådeFørOgEtterFamiliehendelsedato && (
                                <Alert variant="info" size="small">
                                    <FormattedMessage id="RedigeringPanel.KanIkkeLeggeTilPeriode" />
                                </Alert>
                            )}
                            {kanIkkeLeggeTilFerie && harValgtPerioderBådeFørOgEtterFamiliehendelsedato && (
                                <Alert variant="info" size="small">
                                    <FormattedMessage
                                        id="RedigeringPanel.KanIkkeLeggeTilPeriodeValgForOgEtter"
                                        values={{ dato: dayjs(familiehendelsedato).format(DDMMM_DATE_FORMAT) }}
                                    />
                                </Alert>
                            )}
                            {children}
                        </VStack>
                    </div>
                </VStack>
            </VStack>
        </>
    );
};

const Detaljer = ({
    ekisterendePerioderSomErValgt,
    slettPeriode,
    erMinimert,
}: {
    ekisterendePerioderSomErValgt: PlanperiodeMedAntallDager[];
    slettPeriode: (periode: { fom: string; tom: string }) => void;
    erMinimert: boolean;
}) => {
    return (
        <>
            {ekisterendePerioderSomErValgt.length === 0 && (
                <VStack gap="space-8">
                    <Heading size="xsmall">
                        <FormattedMessage id="RedigeringPanel.DuHarMarkertNyeDager" />
                    </Heading>
                    <BodyShort>
                        <FormattedMessage id="RedigeringPanel.NyeDagerForklaring" />
                    </BodyShort>
                </VStack>
            )}
            {ekisterendePerioderSomErValgt.length > 0 && (
                <>
                    <BodyShort>
                        <FormattedMessage id="RedigeringPanel.EksisterendePerioder" />
                    </BodyShort>
                    {!erMinimert && (
                        <Periodeoversikt perioder={ekisterendePerioderSomErValgt} slettPeriode={slettPeriode} />
                    )}
                </>
            )}
        </>
    );
};

const finnAntallDager = (perioder: CalendarPeriod[]): number => {
    return perioder.reduce((acc, periode) => {
        const dager = dayjs(periode.tom).diff(dayjs(periode.fom), 'day') + 1;
        return acc + dager;
    }, 0);
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

const harValgtBådeFørOgEtterFamiliehendelsedato = (
    perioder: CalendarPeriod[],
    familiehendelsedato: string,
): boolean => {
    const harPeriodeFør = perioder.some((p) => dayjs(p.fom).isBefore(familiehendelsedato));
    const harPeriodeEtter = perioder.some((p) => dayjs(p.tom).isSameOrAfter(familiehendelsedato));

    return harPeriodeFør && harPeriodeEtter;
};
