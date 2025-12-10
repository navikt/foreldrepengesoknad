import { ParasolBeachIcon, PersonPregnantFillIcon, PersonSuitFillIcon, TrashIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { uniqueId } from 'lodash';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, HStack, Heading, Spacer, VStack } from '@navikt/ds-react';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { BrukerRolleSak_fpoversikt } from '@navikt/fp-types/src/genererteTyper';
import { CalendarPeriod } from '@navikt/fp-ui';
import { UttaksdagenString } from '@navikt/fp-utils';

import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';

export type PlanperiodeMedAntallDager = Planperiode & { valgteDagerIPeriode: number };

interface Props {
    perioder: PlanperiodeMedAntallDager[];
}

export const EksisterendeValgtePerioder = ({ perioder }: Props) => {
    const intl = useIntl();

    const slettPeriode = useSlettPeriodeFn();

    return (
        <VStack gap="space-12">
            {perioder.map((p) => {
                const erFellesperiodeOgMor =
                    p.kontoType === 'FELLESPERIODE' && !p.erAnnenPartEøs && p.forelder === 'MOR';
                const erFellesperiodeOgFar =
                    p.kontoType === 'FELLESPERIODE' && !p.erAnnenPartEøs && p.forelder === 'FAR_MEDMOR';
                const erForeldrepengerOgMor =
                    p.kontoType === 'FORELDREPENGER' && !p.erAnnenPartEøs && p.forelder === 'MOR';
                const erForeldrepengerOgFar =
                    p.kontoType === 'FORELDREPENGER' && !p.erAnnenPartEøs && p.forelder === 'FAR_MEDMOR';

                return (
                    <HStack
                        gap="space-8"
                        key={p.id}
                        wrap={false}
                        data-testid={`eksisterende-periode-${p.fom}-${p.tom}`}
                    >
                        {(p.kontoType === 'FORELDREPENGER_FØR_FØDSEL' ||
                            p.kontoType === 'MØDREKVOTE' ||
                            erForeldrepengerOgMor ||
                            erFellesperiodeOgMor) && (
                            <PersonPregnantFillIcon
                                title={intl.formatMessage({ id: 'RedigeringPanel.Mor' })}
                                fontSize="1.5rem"
                                height="35px"
                                width="35px"
                                color="var(--ax-bg-meta-purple-strong)"
                            />
                        )}
                        {(p.kontoType === 'FEDREKVOTE' || erFellesperiodeOgFar || erForeldrepengerOgFar) && (
                            <PersonSuitFillIcon
                                title={intl.formatMessage({ id: 'RedigeringPanel.Far' })}
                                fontSize="1.5rem"
                                height="35px"
                                width="35px"
                                color="var(--ax-bg-success-strong)"
                            />
                        )}
                        {!p.erAnnenPartEøs && p.utsettelseÅrsak === 'LOVBESTEMT_FERIE' && (
                            <ParasolBeachIcon
                                title={intl.formatMessage({ id: 'RedigeringPanel.Ferie' })}
                                fontSize="1.5rem"
                                height="35px"
                                width="35px"
                                color="var(--ax-bg-warning-strong)"
                            />
                        )}
                        <VStack gap="space-0">
                            {(p.erAnnenPartEøs || p.utsettelseÅrsak !== 'LOVBESTEMT_FERIE') && (
                                <Heading size="xsmall">
                                    {(p.kontoType === 'FORELDREPENGER_FØR_FØDSEL' ||
                                        p.kontoType === 'MØDREKVOTE' ||
                                        erFellesperiodeOgMor ||
                                        erForeldrepengerOgMor) && <FormattedMessage id="RedigeringPanel.Mor" />}
                                    {(p.kontoType === 'FEDREKVOTE' ||
                                        erFellesperiodeOgFar ||
                                        erForeldrepengerOgFar) && <FormattedMessage id="RedigeringPanel.Far" />}
                                    {!p.erAnnenPartEøs &&
                                        p.kontoType === undefined &&
                                        p.utsettelseÅrsak !== undefined &&
                                        p.forelder === 'MOR' && <FormattedMessage id="RedigeringPanel.Mor" />}
                                    {!p.erAnnenPartEøs &&
                                        p.kontoType === undefined &&
                                        p.utsettelseÅrsak !== undefined &&
                                        p.forelder === 'FAR_MEDMOR' && <FormattedMessage id="RedigeringPanel.Far" />}
                                </Heading>
                            )}
                            <HStack gap="space-4">
                                <BodyShort>
                                    {p.kontoType === 'FORELDREPENGER_FØR_FØDSEL' && (
                                        <FormattedMessage id="RedigeringPanel.MorHarForeldrepengerFørFødsel" />
                                    )}
                                    {p.kontoType === 'MØDREKVOTE' && <FormattedMessage id="RedigeringPanel.MorKvote" />}
                                    {p.kontoType === 'FEDREKVOTE' && <FormattedMessage id="RedigeringPanel.FarKvote" />}
                                    {p.kontoType === 'FORELDREPENGER' && (
                                        <FormattedMessage id="RedigeringPanel.Foreldrepenger" />
                                    )}
                                    {p.kontoType === 'FELLESPERIODE' && (
                                        <FormattedMessage id="RedigeringPanel.Fellesperiode" />
                                    )}
                                    {!p.erAnnenPartEøs && p.utsettelseÅrsak === 'LOVBESTEMT_FERIE' && (
                                        <FormattedMessage id="RedigeringPanel.Ferie" />
                                    )}
                                </BodyShort>
                            </HStack>
                            {!p.erAnnenPartEøs && p.samtidigUttak !== undefined && (
                                <BodyShort>
                                    <FormattedMessage
                                        id="RedigeringPanel.SamtidigUttak"
                                        values={{ prosent: p.samtidigUttak }}
                                    />
                                </BodyShort>
                            )}
                            {!p.erAnnenPartEøs && p.gradering !== undefined && (
                                <BodyShort>
                                    <FormattedMessage
                                        id="RedigeringPanel.Gradering"
                                        values={{ prosent: p.gradering.arbeidstidprosent }}
                                    />
                                </BodyShort>
                            )}
                            <BodyShort>
                                <FormattedMessage
                                    id="RedigeringPanel.Dager"
                                    values={{ antall: p.valgteDagerIPeriode }}
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
                );
            })}
        </VStack>
    );
};

const useSlettPeriodeFn = () => {
    const { sammenslåtteValgtePerioder, oppdaterUttaksplan, setValgtePerioder } = useKalenderRedigeringContext();

    return (periodeSomSkalSlettes: { fom: string; tom: string; forelder?: BrukerRolleSak_fpoversikt }) => {
        const fomPeriodeSomSkalSlettes = dayjs(periodeSomSkalSlettes.fom);
        const tomPeriodeSomSkalSlettes = dayjs(periodeSomSkalSlettes.tom);

        const perioder = sammenslåtteValgtePerioder.filter(
            (p) =>
                fomPeriodeSomSkalSlettes.isSameOrBefore(dayjs(p.tom), 'day') &&
                tomPeriodeSomSkalSlettes.isSameOrAfter(dayjs(p.fom), 'day'),
        );

        oppdaterUttaksplan(
            perioder.map<Planperiode>((p) => ({
                erAnnenPartEøs: false,
                forelder: periodeSomSkalSlettes.forelder,
                periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
                fom: dayjs(p.fom).isBefore(periodeSomSkalSlettes.fom) ? periodeSomSkalSlettes.fom : p.fom,
                tom: dayjs(p.tom).isAfter(periodeSomSkalSlettes.tom) ? periodeSomSkalSlettes.tom : p.tom,
                readOnly: false,
                id: uniqueId(),
            })),
        );

        setValgtePerioder((oldPeriods) => justerValgteKalenderperioder(oldPeriods, periodeSomSkalSlettes));
    };
};

const justerValgteKalenderperioder = (
    valgtePerioder: CalendarPeriod[],
    periodeSomSkalSlettes: { fom: string; tom: string },
) => {
    const fomSlett = dayjs(periodeSomSkalSlettes.fom);
    const tomSlett = dayjs(periodeSomSkalSlettes.tom);

    return valgtePerioder.flatMap((periode) => {
        const fom = dayjs(periode.fom);
        const tom = dayjs(periode.tom);

        // Hvis perioden ikke overlapper perioden som skal slettes, behold hele perioden
        if (tom.isBefore(fomSlett, 'day') || fom.isAfter(tomSlett, 'day')) {
            return [periode];
        }

        const nyePerioder = [];

        // Behold delen av valgt periode som ligger før perioden som skal slettes
        if (fom.isBefore(fomSlett, 'day')) {
            nyePerioder.push({
                ...periode,
                fom: periode.fom,
                tom: UttaksdagenString(fomSlett.subtract(1, 'day').format(ISO_DATE_FORMAT)).denneEllerForrige(),
            });
        }

        // Behold delen av valgt periode som ligger etter delen som skal slettes
        if (tom.isAfter(tomSlett, 'day')) {
            nyePerioder.push({
                ...periode,
                fom: UttaksdagenString(tomSlett.add(1, 'day').format(ISO_DATE_FORMAT)).denneEllerNeste(),
                tom: periode.tom,
            });
        }

        return nyePerioder;
    });
};
