import { PersonGroupIcon, PersonPregnantFillIcon, PersonSuitFillIcon, TrashIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { uniqueId } from 'lodash';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Box, Button, HStack, Heading, Spacer, VStack } from '@navikt/ds-react';

import { Forelder } from '@navikt/fp-constants';
import { UtsettelseÅrsakType } from '@navikt/fp-types';
import { Period } from '@navikt/fp-ui';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { PeriodeHullType, Planperiode } from '../types/Planperiode';

type PlanperiodeMedAntallDager = Planperiode & { overlappendeDager: number };

type Props = {
    valgtePerioder: Period[];
    komplettPlan: Planperiode[];
    handleOnPlanChange: (oppdatertPeriode: Planperiode[], leggTil: boolean) => void;
    familiehendelsedato: string;
    setSelectedPeriods: (perioder: Period[]) => void;
};

export const RedigeringPanel = ({ valgtePerioder, komplettPlan, handleOnPlanChange, setSelectedPeriods }: Props) => {
    const [erIRedigeringsmodus, setErIRedigeringsmodus] = useState(false);
    const { erFarEllerMedmor } = useUttaksplanData();

    const sammenslåtteValgtePerioder = slåSammenTilstøtendePerioder(valgtePerioder);

    // useEffect(() => {
    //     // Lukk redigeringsmodus når bruker endrer på valgte perioder i kalender
    //     setErIRedigeringsmodus(false);
    // }, [sammenslåtteValgtePerioder]);

    // const valgtePerioderIKomplettPlan = komplettPlan.filter((p) =>
    //     sammenslåtteValgtePerioder.some((vp) => {
    //         return (
    //             (dayjs(vp.fom).isSameOrAfter(dayjs(p.fom), 'day') &&
    //                 dayjs(vp.fom).isSameOrBefore(dayjs(p.tom), 'day')) ||
    //             (dayjs(vp.tom).isSameOrAfter(dayjs(p.fom), 'day') &&
    //                 dayjs(vp.tom).isSameOrBefore(dayjs(p.tom), 'day')) ||
    //             (dayjs(vp.fom).isBefore(dayjs(p.fom), 'day') && dayjs(vp.tom).isAfter(dayjs(p.tom), 'day'))
    //         );
    //     }),
    // );

    const slettPeriode = () => {
        const planperioder = sammenslåtteValgtePerioder.map<Planperiode>((p) => ({
            forelder: erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor,
            periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
            fom: p.fom,
            tom: p.tom,
            readOnly: false,
            id: uniqueId(),
        }));

        handleOnPlanChange(planperioder, true);

        setErIRedigeringsmodus(false);
        setSelectedPeriods([]);
    };

    const leggTilFerie = () => {
        const planperioder = sammenslåtteValgtePerioder.map<Planperiode>((p) => ({
            forelder: erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor,
            fom: p.fom,
            tom: p.tom,
            readOnly: false,
            id: uniqueId(),
            utsettelseÅrsak: UtsettelseÅrsakType.Ferie,
        }));

        handleOnPlanChange(planperioder, true);

        setErIRedigeringsmodus(false);
        setSelectedPeriods([]);
    };

    //TODO EndrePeriodPanel kan i dag kun oppdatera ein periode om gongen. Må endrast
    // const permisjonsperioder = mapPerioderToPermisjonsperiode(valgtePerioderIKomplettPlan, familiehendelsedato).at(0)!;

    //TODO Korleis skal ein håndtera valg av både nye og endra datoar samtidig?

    const ekisterendePerioderSomErValgt = finnValgtePerioder(valgtePerioder, komplettPlan);

    return (
        <>
            {!erIRedigeringsmodus && (
                <Box.New
                    borderWidth="1"
                    borderRadius="4"
                    borderColor="neutral-subtle"
                    padding="4"
                    width="400px"
                    height="fit-content"
                >
                    <VStack gap="space-16">
                        <VStack gap="space-4">
                            <Heading size="xsmall">
                                <FormattedMessage
                                    id="RedigeringPanel.ValgteDager"
                                    values={{ antall: finnAntallDager(valgtePerioder) }}
                                />
                            </Heading>
                            {ekisterendePerioderSomErValgt.length > 0 && (
                                <BodyShort>
                                    <FormattedMessage id="RedigeringPanel.EksisterendePerioder" />
                                </BodyShort>
                            )}
                        </VStack>
                        {ekisterendePerioderSomErValgt.length > 0 && (
                            <EksisterendePeriodeListe perioder={ekisterendePerioderSomErValgt} />
                        )}
                        <Button variant="secondary" size="small" onClick={leggTilFerie}>
                            <FormattedMessage id="RedigeringPanel.LeggInnFerie" />
                        </Button>
                        <HStack gap="space-16">
                            <Button variant="primary" size="small" onClick={() => setErIRedigeringsmodus(true)}>
                                <FormattedMessage id="RedigeringPanel.RedigerUttaksplan" />
                            </Button>
                            {ekisterendePerioderSomErValgt.length > 0 && (
                                <Button variant="tertiary" size="small" onClick={slettPeriode}>
                                    <FormattedMessage id="RedigeringPanel.SlettAlle" />
                                </Button>
                            )}
                        </HStack>
                    </VStack>
                </Box.New>
            )}
            {/* {erIRedigeringsmodus && (
                <>
                    {!permisjonsperioder && (
                        <LeggTilPeriodePanel
                            onCancel={() => setErIRedigeringsmodus(false)}
                            handleAddPeriode={(nyPeriode) => handleOnPlanChange([nyPeriode], true)}
                        />
                    )}
                    {!!permisjonsperioder && (
                        <EndrePeriodePanel
                            closePanel={() => setErIRedigeringsmodus(false)}
                            handleUpdatePeriode={(oppdatertPeriode) => handleOnPlanChange([oppdatertPeriode], false)}
                            handleAddPeriode={() => {}}
                            permisjonsperiode={permisjonsperioder}
                            inneholderKunEnPeriode
                        />
                    )}
                </>
            )} */}
        </>
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

const EksisterendePeriodeListe = ({ perioder }: { perioder: PlanperiodeMedAntallDager[] }) => {
    return (
        <VStack gap="space-8">
            {perioder
                .filter((p) => !!p.kontoType)
                .map((p) => (
                    <HStack gap="space-4" align="center" key={p.id}>
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
                                {p.kontoType === 'FORELDREPENGER_FØR_FØDSEL' && (
                                    <FormattedMessage id="RedigeringPanel.MorHarForeldrepengerFørFødsel" />
                                )}
                                {p.kontoType === 'MØDREKVOTE' && <FormattedMessage id="RedigeringPanel.Mødrekvote" />}
                                {p.kontoType === 'FEDREKVOTE' && <FormattedMessage id="RedigeringPanel.Fedrekvote" />}
                                {p.kontoType === 'FELLESPERIODE' && (
                                    <FormattedMessage id="RedigeringPanel.Fellesperiode" />
                                )}
                            </Heading>
                            <BodyShort>
                                <FormattedMessage
                                    id="RedigeringPanel.Dager"
                                    values={{ dato: formaterDato(p.fom, p.tom), antall: p.overlappendeDager }}
                                />
                            </BodyShort>
                        </VStack>
                        <Spacer />
                        <TrashIcon title="a11y-title" fontSize="1.5rem" />
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
