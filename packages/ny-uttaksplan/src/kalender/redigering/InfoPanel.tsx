import { ChevronDownIcon, ChevronUpIcon, PencilIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { uniqueId } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, Box, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { DDMMM_DATE_FORMAT } from '@navikt/fp-constants';
import { CalendarPeriod } from '@navikt/fp-ui';
import { useMedia } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import { Periodeoversikt, type PlanperiodeMedAntallDager } from './Periodeoversikt';

type Props = {
    sammenslåtteValgtePerioder: CalendarPeriod[];
    erMinimert: boolean;
    erEnkelRedigeringPanel: boolean;
    children: React.ReactNode[] | React.ReactNode;
    oppdaterUttaksplan: (oppdatertePerioder: Planperiode[]) => void;
    setValgtePerioder: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>;
    setErMinimert: (erMinimert: boolean) => void;
};

export const InfoPanel = ({
    sammenslåtteValgtePerioder,
    oppdaterUttaksplan,
    setValgtePerioder,
    erMinimert,
    setErMinimert,
    erEnkelRedigeringPanel,
    children,
}: Props) => {
    const [visPeriodeDetaljer, setVisPeriodeDetaljer] = useState(erEnkelRedigeringPanel);

    const { uttaksplan, erFarEllerMedmor, familiehendelsedato } = useUttaksplanData();

    // Dette er her for å fjern scrolling på bakgrunn på mobil
    const isDesktop = useMedia('screen and (min-width: 768px)');
    useEffect(() => {
        document.body.style.overflow = '';
        if (!isDesktop && !erMinimert && !erEnkelRedigeringPanel) {
            document.body.style.overflow = 'hidden';
        }
    }, [isDesktop, erMinimert]);

    const slettPeriode = (periode: { fom: string; tom: string }) => {
        const start = dayjs(periode.fom);
        const end = dayjs(periode.tom);

        const perioder = sammenslåtteValgtePerioder.filter((p) => {
            const pStart = dayjs(p.fom);
            const pEnd = dayjs(p.tom);

            return start.isSameOrBefore(pEnd, 'day') && end.isSameOrAfter(pStart, 'day');
        });

        oppdaterUttaksplan(
            perioder.map<Planperiode>((p) => ({
                forelder: erFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR',
                periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
                fom: p.fom,
                tom: p.tom,
                readOnly: false,
                id: uniqueId(),
            })),
        );

        setValgtePerioder((oldPeriods) =>
            oldPeriods.filter(
                (p) =>
                    !perioder.some(
                        (rp) => dayjs(p.fom).isSameOrBefore(rp.tom, 'day') && dayjs(p.tom).isSameOrAfter(rp.fom, 'day'),
                    ),
            ),
        );
    };

    const ekisterendePerioderSomErValgt = useMemo(
        () => finnValgtePerioder(sammenslåtteValgtePerioder, uttaksplan),
        [sammenslåtteValgtePerioder, uttaksplan],
    );

    const kanIkkeLeggeTilFerie = sammenslåtteValgtePerioder.some((p) => erFerieIkkeLovlig(p, familiehendelsedato));
    const harValgtPerioderBådeFørOgEtterFamiliehendelsedato = harValgtBådeFørOgEtterFamiliehendelsedato(
        sammenslåtteValgtePerioder,
        familiehendelsedato,
    );

    return (
        <VStack
            gap="space-24"
            className={
                !erEnkelRedigeringPanel && !erMinimert
                    ? 'bg-ax-bg-default fixed inset-0 z-50 overflow-y-auto md:static md:overflow-visible'
                    : undefined
            }
        >
            <Box.New background="accent-soft" padding="4">
                <VStack gap="space-8">
                    {!erEnkelRedigeringPanel && (
                        <HStack gap="space-8" align="center" wrap={false}>
                            <PencilIcon title="a11y-title" fontSize="1.5rem" />
                            <Heading size="small">
                                <FormattedMessage id="RedigeringPanel.EndreTil" />
                            </Heading>
                        </HStack>
                    )}
                    <HStack justify="space-between" align="center" wrap={false}>
                        <Heading size="xsmall">
                            <FormattedMessage
                                id="RedigeringPanel.ValgteDager"
                                values={{ antall: finnAntallDager(sammenslåtteValgtePerioder) }}
                            />
                        </Heading>
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
                        {!erEnkelRedigeringPanel && (
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
                    <BodyShort>
                        {ekisterendePerioderSomErValgt.length === 0 ? (
                            <FormattedMessage id="RedigeringPanel.DuHarMarkertNyeDager" />
                        ) : (
                            <FormattedMessage
                                id="RedigeringPanel.EksisterendePerioder"
                                values={{ antall: ekisterendePerioderSomErValgt.length }}
                            />
                        )}
                    </BodyShort>
                    {!erEnkelRedigeringPanel && visPeriodeDetaljer && (
                        <Show above="md">
                            <Detaljer
                                ekisterendePerioderSomErValgt={ekisterendePerioderSomErValgt}
                                slettPeriode={slettPeriode}
                                kanIkkeLeggeTilFerie={kanIkkeLeggeTilFerie}
                                harValgtPerioderBådeFørOgEtterFamiliehendelsedato={
                                    harValgtPerioderBådeFørOgEtterFamiliehendelsedato
                                }
                                familiehendelsedato={familiehendelsedato}
                            />
                        </Show>
                    )}
                    {!erEnkelRedigeringPanel && !erMinimert && (
                        <Show below="md">
                            <Detaljer
                                ekisterendePerioderSomErValgt={ekisterendePerioderSomErValgt}
                                slettPeriode={slettPeriode}
                                kanIkkeLeggeTilFerie={kanIkkeLeggeTilFerie}
                                harValgtPerioderBådeFørOgEtterFamiliehendelsedato={
                                    harValgtPerioderBådeFørOgEtterFamiliehendelsedato
                                }
                                familiehendelsedato={familiehendelsedato}
                            />
                        </Show>
                    )}
                </VStack>
            </Box.New>

            <div className={erMinimert ? 'hidden' : 'block px-4 pb-4'}>
                <VStack gap="space-24">
                    {erEnkelRedigeringPanel && (
                        <Detaljer
                            ekisterendePerioderSomErValgt={ekisterendePerioderSomErValgt}
                            slettPeriode={slettPeriode}
                            kanIkkeLeggeTilFerie={kanIkkeLeggeTilFerie}
                            harValgtPerioderBådeFørOgEtterFamiliehendelsedato={
                                harValgtPerioderBådeFørOgEtterFamiliehendelsedato
                            }
                            familiehendelsedato={familiehendelsedato}
                        />
                    )}

                    {children}
                </VStack>
            </div>
        </VStack>
    );
};

const Detaljer = ({
    ekisterendePerioderSomErValgt,
    slettPeriode,
    kanIkkeLeggeTilFerie,
    harValgtPerioderBådeFørOgEtterFamiliehendelsedato,
    familiehendelsedato,
}: {
    ekisterendePerioderSomErValgt: PlanperiodeMedAntallDager[];
    slettPeriode: (periode: { fom: string; tom: string }) => void;
    kanIkkeLeggeTilFerie: boolean;
    harValgtPerioderBådeFørOgEtterFamiliehendelsedato: boolean;
    familiehendelsedato: string;
}) => {
    return (
        <VStack gap="space-16">
            {ekisterendePerioderSomErValgt.length === 0 && (
                <BodyShort>
                    <FormattedMessage id="RedigeringPanel.NyeDagerForklaring" />
                </BodyShort>
            )}

            {ekisterendePerioderSomErValgt.length > 0 && (
                <Periodeoversikt perioder={ekisterendePerioderSomErValgt} slettPeriode={slettPeriode} />
            )}

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
        </VStack>
    );
};

const finnAntallDager = (perioder: CalendarPeriod[]): number => {
    return perioder.reduce((acc, periode) => {
        const dager = dayjs(periode.tom).diff(dayjs(periode.fom), 'day') + 1;
        return acc + dager;
    }, 0);
};

const finnValgtePerioder = (perioder: CalendarPeriod[], uttaksplan: Planperiode[]): PlanperiodeMedAntallDager[] => {
    return uttaksplan
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

const erFerieIkkeLovlig = (periode: CalendarPeriod, familiehendelsedato: string): boolean => {
    return dayjs(periode.fom).isBefore(familiehendelsedato);
};

const harValgtBådeFørOgEtterFamiliehendelsedato = (
    perioder: CalendarPeriod[],
    familiehendelsedato: string,
): boolean => {
    const harPeriodeFør = perioder.some((p) => dayjs(p.fom).isBefore(familiehendelsedato));
    const harPeriodeEtter = perioder.some((p) => dayjs(p.tom).isSameOrAfter(familiehendelsedato));

    return harPeriodeFør && harPeriodeEtter;
};
