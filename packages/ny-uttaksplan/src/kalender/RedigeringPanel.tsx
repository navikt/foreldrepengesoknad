import {
    ChevronDownIcon,
    ChevronUpIcon,
    PersonGroupIcon,
    PersonPregnantFillIcon,
    PersonSuitFillIcon,
    TrashIcon,
} from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { uniqueId } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, BodyShort, Box, Button, HStack, Heading, Spacer, VStack } from '@navikt/ds-react';

import { Period } from '@navikt/fp-types';
import { useMedia } from '@navikt/fp-utils';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { PeriodeHullType, Planperiode } from '../types/Planperiode';
import { LeggTilPeriodePanel, erFerieLovlig } from './legg-til-periode-panel/LeggTilPeriodePanel';

type PlanperiodeMedAntallDager = Planperiode & { overlappendeDager: number };

type Props = {
    valgtePerioder: Period[];
    komplettPlan: Planperiode[];
    handleOnPlanChange: (oppdatertePerioder: Planperiode[]) => void;
    familiehendelsedato: string;
    setSelectedPeriods: React.Dispatch<React.SetStateAction<Period[]>>;
};

export const RedigeringPanel = ({ valgtePerioder, komplettPlan, handleOnPlanChange, setSelectedPeriods }: Props) => {
    const [erIRedigeringsmodus, setErIRedigeringsmodus] = useState(false);
    const [erMinimert, setErMinimert] = useState(false);
    const [kanIkkeLeggeTilFerie, setKanIkkeLeggeTilFerie] = useState(false);

    const { erFarEllerMedmor, familiehendelsedato } = useUttaksplanData();

    const sammenslåtteValgtePerioder = useMemo(() => slåSammenTilstøtendePerioder(valgtePerioder), [valgtePerioder]);

    const isDesktop = useMedia('screen and (min-width: 640px)');

    useEffect(() => {
        if (isDesktop) {
            setErMinimert(false);
        }
    }, [isDesktop]);

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

    const slettPeriode = (periode: { fom: string; tom: string }) => {
        const start = dayjs(periode.fom);
        const end = dayjs(periode.tom);

        const perioder = sammenslåtteValgtePerioder.filter((p) => {
            const pStart = dayjs(p.fom);
            const pEnd = dayjs(p.tom);

            return start.isSameOrBefore(pEnd, 'day') && end.isSameOrAfter(pStart, 'day');
        });

        const planperioder = perioder.map<Planperiode>((p) => ({
            forelder: erFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR',
            periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
            fom: p.fom,
            tom: p.tom,
            readOnly: false,
            id: uniqueId(),
        }));

        handleOnPlanChange(planperioder);

        setSelectedPeriods((oldPeriods) =>
            oldPeriods.filter(
                (p) =>
                    // keep only those that do NOT overlap any deleted range
                    !perioder.some(
                        (rp) => dayjs(p.fom).isSameOrBefore(rp.tom, 'day') && dayjs(p.tom).isSameOrAfter(rp.fom, 'day'),
                    ),
            ),
        );
    };

    const leggTilFerie = () => {
        if (!valgtePerioder.some((p) => erFerieLovlig(p, familiehendelsedato))) {
            const planperioder = sammenslåtteValgtePerioder.map<Planperiode>((p) => ({
                forelder: erFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR',
                fom: p.fom,
                tom: p.tom,
                readOnly: false,
                id: uniqueId(),
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
            }));

            handleOnPlanChange(planperioder);

            setErIRedigeringsmodus(false);
            setSelectedPeriods([]);
        } else {
            setKanIkkeLeggeTilFerie(true);
        }
    };

    const ekisterendePerioderSomErValgt = useMemo(
        () => finnValgtePerioder(valgtePerioder, komplettPlan),
        [valgtePerioder, komplettPlan],
    );

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
                <div className="p-4">
                    <div className="block sm:hidden">
                        <HStack justify="space-between" align="center" wrap={false}>
                            <Heading size="xsmall">
                                <FormattedMessage
                                    id="RedigeringPanel.ValgteDager"
                                    values={{ antall: finnAntallDager(valgtePerioder) }}
                                />
                            </Heading>
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
                        </HStack>
                    </div>
                    <div className={erMinimert ? 'hidden' : 'block'}>
                        <VStack gap="space-16">
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
                                    <EksisterendePeriodeListe
                                        perioder={ekisterendePerioderSomErValgt}
                                        slettPeriode={slettPeriode}
                                    />
                                </>
                            )}
                            {kanIkkeLeggeTilFerie && (
                                <Alert variant="info" size="small">
                                    <FormattedMessage id="RedigeringPanel.KanIkkeLeggeTilFerie" />
                                </Alert>
                            )}
                            <Button
                                variant="primary"
                                size="small"
                                onClick={() => setErIRedigeringsmodus(true)}
                                type="button"
                            >
                                <FormattedMessage id="RedigeringPanel.RedigerUttaksplan" />
                            </Button>
                            <HStack justify="space-between">
                                <Button variant="secondary" size="small" onClick={leggTilFerie} type="button">
                                    <FormattedMessage id="RedigeringPanel.LeggInnFerie" />
                                </Button>
                                {ekisterendePerioderSomErValgt.length > 0 && (
                                    <Button variant="tertiary" size="small" onClick={slettAllePerioder} type="button">
                                        <FormattedMessage id="RedigeringPanel.SlettAlle" />
                                    </Button>
                                )}
                            </HStack>
                        </VStack>
                    </div>
                </div>
            )}
            {erIRedigeringsmodus && (
                <LeggTilPeriodePanel
                    onCancel={() => setErIRedigeringsmodus(false)}
                    handleAddPeriode={(nyePerioder) => {
                        handleOnPlanChange(nyePerioder);
                        setSelectedPeriods([]);
                    }}
                    valgtePerioder={sammenslåtteValgtePerioder}
                    erMinimert={erMinimert}
                    setErMinimert={setErMinimert}
                />
            )}
        </Box.New>
    );
};

const slåSammenTilstøtendePerioder = (perioder: Period[]): Period[] => {
    if (!perioder.length) return [];

    return [...perioder]
        .sort((a, b) => dayjs(a.fom).diff(dayjs(b.fom)))
        .reduce<Period[]>((acc, curr) => {
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

const finnAntallDager = (perioder: Period[]): number => {
    return perioder.reduce((acc, periode) => {
        const dager = dayjs(periode.tom).diff(dayjs(periode.fom), 'day') + 1;
        return acc + dager;
    }, 0);
};

const finnValgtePerioder = (perioder: Period[], komplettPlan: Planperiode[]): PlanperiodeMedAntallDager[] => {
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

const EksisterendePeriodeListe = ({
    perioder,
    slettPeriode,
}: {
    perioder: PlanperiodeMedAntallDager[];
    slettPeriode: (periode: { fom: string; tom: string }) => void;
}) => {
    const intl = useIntl();
    return (
        <VStack gap="space-12">
            {perioder.map((p) => (
                <HStack gap="space-4" key={p.id} wrap={false}>
                    {(p.kontoType === 'FORELDREPENGER_FØR_FØDSEL' || p.kontoType === 'MØDREKVOTE') && (
                        <PersonPregnantFillIcon
                            title="a11y-title"
                            fontSize="1.5rem"
                            height="35px"
                            width="35px"
                            color="var(--ax-bg-meta-purple-strong)"
                        />
                    )}
                    {p.kontoType === 'FEDREKVOTE' && (
                        <PersonSuitFillIcon
                            title="a11y-title"
                            fontSize="1.5rem"
                            height="35px"
                            width="35px"
                            color="var(--ax-bg-success-strong)"
                        />
                    )}
                    {p.kontoType === 'FELLESPERIODE' && (
                        <PersonGroupIcon
                            title="a11y-title"
                            fontSize="1.5rem"
                            height="35px"
                            width="35px"
                            color="var(--ax-bg-success-strong)"
                        />
                    )}
                    <VStack gap="space-0">
                        <Heading size="xsmall">
                            {(p.kontoType === 'FORELDREPENGER_FØR_FØDSEL' || p.kontoType === 'MØDREKVOTE') && (
                                <FormattedMessage id="RedigeringPanel.Mor" />
                            )}
                            {p.kontoType === 'FEDREKVOTE' && <FormattedMessage id="RedigeringPanel.Far" />}
                            {p.kontoType === 'FELLESPERIODE' && <FormattedMessage id="RedigeringPanel.Felles" />}
                            {p.utsettelseÅrsak === 'LOVBESTEMT_FERIE' && (
                                <FormattedMessage id="RedigeringPanel.Ferie" />
                            )}
                        </Heading>
                        <BodyShort>
                            {p.kontoType === 'FORELDREPENGER_FØR_FØDSEL' && (
                                <FormattedMessage id="RedigeringPanel.MorHarForeldrepengerFørFødsel" />
                            )}
                            {(p.kontoType === 'MØDREKVOTE' || p.kontoType === 'FEDREKVOTE') && (
                                <FormattedMessage id="RedigeringPanel.Foreldrepenger" />
                            )}
                            {p.kontoType === 'FELLESPERIODE' && <FormattedMessage id="RedigeringPanel.Fellesperiode" />}
                        </BodyShort>
                        <BodyShort>
                            <FormattedMessage
                                id="RedigeringPanel.Dager"
                                values={{ dato: formaterDato(p.fom, p.tom), antall: p.overlappendeDager }}
                            />
                        </BodyShort>
                    </VStack>
                    <Spacer />
                    <TrashIcon
                        title={intl.formatMessage({ id: 'RedigeringPanel.SlettPeriode' })}
                        fontSize="1.5rem"
                        className="cursor-pointer hover:opacity-70"
                        onClick={() => slettPeriode(p)}
                    />
                </HStack>
            ))}
        </VStack>
    );
};

const formaterDato = (fom: string, tom: string): string => {
    const start = dayjs(fom);
    const end = dayjs(tom);

    const sameDay = start.isSame(end, 'day');
    const sameMonth = start.isSame(end, 'month');
    const sameYear = start.isSame(end, 'year');

    if (sameDay) {
        return start.format('D. MMM YYYY.');
    }

    if (sameMonth && sameYear) {
        return `${start.format('D.')}-${end.format('D. MMM.')}`;
    }

    if (!sameMonth && sameYear) {
        return `${start.format('D. MMM')} - ${end.format('D. MMM.')}`;
    }

    return `${start.format('D. MMM YY')} - ${end.format('D. MMM YY.')}`;
};
