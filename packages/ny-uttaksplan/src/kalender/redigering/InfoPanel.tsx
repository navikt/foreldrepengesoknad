import { ChevronDownIcon, ChevronUpIcon, PencilIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { uniqueId } from 'lodash';
import { useEffect, useState } from 'react';
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
    eksisterendePerioderSomErValgt: PlanperiodeMedAntallDager[];
    oppdaterUttaksplan: (oppdatertePerioder: Planperiode[]) => void;
    setValgtePerioder: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>;
    setErMinimert: (erMinimert: boolean) => void;
};

export const InfoPanel = ({
    sammenslåtteValgtePerioder,
    erMinimert,
    erEnkelRedigeringPanel,
    children,
    eksisterendePerioderSomErValgt,
    oppdaterUttaksplan,
    setValgtePerioder,
    setErMinimert,
}: Props) => {
    const [visPeriodeDetaljer, setVisPeriodeDetaljer] = useState(erEnkelRedigeringPanel);

    const { erFarEllerMedmor, familiehendelsedato } = useUttaksplanData();

    // Dette er her for å fjern scrolling på bakgrunn på mobil
    const isDesktop = useMedia('screen and (min-width: 768px)');
    useEffect(() => {
        document.body.style.overflow = '';
        if (!isDesktop && !erMinimert && !erEnkelRedigeringPanel) {
            document.body.style.overflow = 'hidden';
        }
    }, [isDesktop, erMinimert]);

    const slettPeriode = getSlettPeriodeFn(
        sammenslåtteValgtePerioder,
        erFarEllerMedmor,
        oppdaterUttaksplan,
        setValgtePerioder,
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
                        {eksisterendePerioderSomErValgt.length === 0 ? (
                            <FormattedMessage id="RedigeringPanel.DuHarMarkertNyeDager" />
                        ) : (
                            <FormattedMessage
                                id="RedigeringPanel.EksisterendePerioder"
                                values={{ antall: eksisterendePerioderSomErValgt.length }}
                            />
                        )}
                    </BodyShort>
                    {!erEnkelRedigeringPanel && visPeriodeDetaljer && (
                        <Show above="md">
                            <Detaljer
                                eksisterendePerioderSomErValgt={eksisterendePerioderSomErValgt}
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
                                eksisterendePerioderSomErValgt={eksisterendePerioderSomErValgt}
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
                            eksisterendePerioderSomErValgt={eksisterendePerioderSomErValgt}
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
    eksisterendePerioderSomErValgt,
    slettPeriode,
    kanIkkeLeggeTilFerie,
    harValgtPerioderBådeFørOgEtterFamiliehendelsedato,
    familiehendelsedato,
}: {
    eksisterendePerioderSomErValgt: PlanperiodeMedAntallDager[];
    slettPeriode: (periode: { fom: string; tom: string }) => void;
    kanIkkeLeggeTilFerie: boolean;
    harValgtPerioderBådeFørOgEtterFamiliehendelsedato: boolean;
    familiehendelsedato: string;
}) => {
    return (
        <VStack gap="space-16">
            {eksisterendePerioderSomErValgt.length === 0 && (
                <BodyShort>
                    <FormattedMessage id="RedigeringPanel.NyeDagerForklaring" />
                </BodyShort>
            )}

            {eksisterendePerioderSomErValgt.length > 0 && (
                <Periodeoversikt perioder={eksisterendePerioderSomErValgt} slettPeriode={slettPeriode} />
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

const getSlettPeriodeFn =
    (
        sammenslåtteValgtePerioder: CalendarPeriod[],
        erFarEllerMedmor: boolean,
        oppdaterUttaksplan: (oppdatertePerioder: Planperiode[]) => void,
        setValgtePerioder: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>,
    ) =>
    (periode: { fom: string; tom: string }) => {
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
