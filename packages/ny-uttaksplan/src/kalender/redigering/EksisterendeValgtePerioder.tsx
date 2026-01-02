import {
    ParasolBeachIcon,
    PersonGroupIcon,
    PersonPregnantFillIcon,
    PersonSuitFillIcon,
    TrashIcon,
} from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, HStack, Heading, Spacer, VStack } from '@navikt/ds-react';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { BrukerRolleSak_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types/src/genererteTyper';
import { CalendarPeriod } from '@navikt/fp-ui';
import { UttaksdagenString } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { Planperiode } from '../../types/Planperiode';
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';

export type PlanperiodeMedAntallDager = Planperiode & { valgteDagerIPeriode: number };

interface Props {
    perioder: PlanperiodeMedAntallDager[];
}

export const EksisterendeValgtePerioder = ({ perioder }: Props) => {
    const intl = useIntl();

    const slettPeriode = useSlettPeriodeFn();

    const {
        foreldreInfo: { erMedmorDelAvSøknaden },
    } = useUttaksplanData();

    return (
        <VStack gap="space-12">
            {perioder.map((p, index) => {
                const harHåndtertAllerede = perioder.findIndex((per) => per.fom === p.fom && per.tom === p.tom) < index;
                if (harHåndtertAllerede) {
                    return null;
                }

                const erSamtidigUttak = !p.erAnnenPartEøs && p.samtidigUttak !== undefined;
                const denAndrePerioden = erSamtidigUttak
                    ? perioder.find(
                          (per) =>
                              per.fom === p.fom &&
                              per.tom === p.tom &&
                              !per.erAnnenPartEøs &&
                              per.forelder !== p.forelder,
                      )
                    : undefined;

                return (
                    <HStack
                        gap="space-8"
                        key={`eksisterende-periode-${p.fom}-${p.tom}`}
                        wrap={false}
                        data-testid={`eksisterende-periode-${p.fom}-${p.tom}`}
                    >
                        <PeriodeIkon periode={p} />

                        <VStack gap="space-0">
                            {(p.erAnnenPartEøs || p.utsettelseÅrsak !== 'LOVBESTEMT_FERIE') && (
                                <Heading size="xsmall">
                                    <PeriodeHeaderText periode={p} />
                                </Heading>
                            )}

                            {!erSamtidigUttak && (
                                <HStack gap="space-4">
                                    <BodyShort>
                                        <PeriodeKvoteType periode={p} />
                                    </BodyShort>
                                </HStack>
                            )}

                            {erSamtidigUttak && (
                                <VStack gap="space-0">
                                    <BodyShort>
                                        <FormattedMessage
                                            id="RedigeringPanel.SamtidigUttakForelder"
                                            values={{
                                                forelder: p.forelder,
                                                erMedmor: p.forelder === 'FAR_MEDMOR' && erMedmorDelAvSøknaden,
                                            }}
                                        />
                                        <FormattedMessage
                                            id="RedigeringPanel.SamtidigUttak"
                                            values={{
                                                kvote: p.kontoType,
                                                prosent: p.samtidigUttak,
                                                erMedmor: p.forelder === 'FAR_MEDMOR' && erMedmorDelAvSøknaden,
                                            }}
                                        />
                                    </BodyShort>
                                    {denAndrePerioden && !denAndrePerioden.erAnnenPartEøs && (
                                        <BodyShort>
                                            <FormattedMessage
                                                id="RedigeringPanel.SamtidigUttakForelder"
                                                values={{
                                                    forelder: denAndrePerioden.forelder,
                                                    erMedmor:
                                                        denAndrePerioden.forelder === 'FAR_MEDMOR' &&
                                                        erMedmorDelAvSøknaden,
                                                }}
                                            />
                                            <FormattedMessage
                                                id="RedigeringPanel.SamtidigUttak"
                                                values={{
                                                    kvote: denAndrePerioden.kontoType,
                                                    prosent: denAndrePerioden.samtidigUttak,
                                                    erMedmor: p.forelder === 'FAR_MEDMOR' && erMedmorDelAvSøknaden,
                                                }}
                                            />
                                        </BodyShort>
                                    )}
                                    {!p.erAnnenPartEøs && p.gradering !== undefined && (
                                        <BodyShort>
                                            <FormattedMessage
                                                id="RedigeringPanel.GraderingForelder"
                                                values={{
                                                    prosent: p.gradering.arbeidstidprosent,
                                                    forelder: p.forelder,
                                                    erMedmor: p.forelder === 'FAR_MEDMOR' && erMedmorDelAvSøknaden,
                                                }}
                                            />
                                        </BodyShort>
                                    )}
                                    {denAndrePerioden &&
                                        !denAndrePerioden.erAnnenPartEøs &&
                                        denAndrePerioden.gradering !== undefined && (
                                            <BodyShort>
                                                <FormattedMessage
                                                    id="RedigeringPanel.GraderingForelder"
                                                    values={{
                                                        prosent: denAndrePerioden.gradering.arbeidstidprosent,
                                                        forelder: denAndrePerioden.forelder,
                                                        erMedmor:
                                                            denAndrePerioden.forelder === 'FAR_MEDMOR' &&
                                                            erMedmorDelAvSøknaden,
                                                    }}
                                                />
                                            </BodyShort>
                                        )}
                                </VStack>
                            )}

                            {!erSamtidigUttak && !p.erAnnenPartEøs && p.gradering !== undefined && (
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

const PeriodeIkon = ({ periode }: { periode: PlanperiodeMedAntallDager }) => {
    const intl = useIntl();

    const erSamtidigUttak = !periode.erAnnenPartEøs && periode.samtidigUttak !== undefined && periode.samtidigUttak > 0;

    if (erSamtidigUttak) {
        return (
            <PersonGroupIcon
                title={intl.formatMessage({ id: 'RedigeringPanel.Mor' })}
                fontSize="1.5rem"
                height="35px"
                width="35px"
                color="var(--ax-bg-meta-purple-strong)"
            />
        );
    }

    if (!periode.erAnnenPartEøs && periode.utsettelseÅrsak === 'LOVBESTEMT_FERIE') {
        return (
            <ParasolBeachIcon
                title={intl.formatMessage({ id: 'RedigeringPanel.Ferie' })}
                fontSize="1.5rem"
                height="35px"
                width="35px"
                color="var(--ax-bg-warning-strong)"
            />
        );
    }

    if (!periode.erAnnenPartEøs && periode.forelder === 'MOR') {
        return (
            <PersonPregnantFillIcon
                title={intl.formatMessage({ id: 'RedigeringPanel.Mor' })}
                fontSize="1.5rem"
                height="35px"
                width="35px"
                color="var(--ax-bg-meta-purple-strong)"
            />
        );
    }

    if (!periode.erAnnenPartEøs && periode.forelder === 'FAR_MEDMOR') {
        return (
            <PersonSuitFillIcon
                title={intl.formatMessage({ id: 'RedigeringPanel.Far' })}
                fontSize="1.5rem"
                height="35px"
                width="35px"
                color="var(--ax-bg-success-strong)"
            />
        );
    }

    return null;
};

const PeriodeHeaderText = ({ periode }: { periode: PlanperiodeMedAntallDager }) => {
    if (!periode.erAnnenPartEøs && periode.samtidigUttak !== undefined) {
        return <FormattedMessage id="RedigeringPanel.Begge" />;
    }

    if (!periode.erAnnenPartEøs && periode.forelder === 'MOR') {
        return <FormattedMessage id="RedigeringPanel.Mor" />;
    }

    if (!periode.erAnnenPartEøs && periode.forelder === 'FAR_MEDMOR') {
        return <FormattedMessage id="RedigeringPanel.Far" />;
    }

    return null;
};

const PeriodeKvoteType = ({ periode }: { periode: PlanperiodeMedAntallDager }) => {
    const erAktivitetsfri =
        periode.kontoType === 'FORELDREPENGER' && !periode.erAnnenPartEøs && periode.morsAktivitet === 'IKKE_OPPGITT';

    if (periode.kontoType === 'FORELDREPENGER_FØR_FØDSEL') {
        return <FormattedMessage id="RedigeringPanel.MorHarForeldrepengerFørFødsel" />;
    }
    if (periode.kontoType === 'MØDREKVOTE') {
        return <FormattedMessage id="RedigeringPanel.MorKvote" />;
    }
    if (periode.kontoType === 'FEDREKVOTE') {
        return <FormattedMessage id="RedigeringPanel.FarKvote" />;
    }
    if (periode.kontoType === 'FORELDREPENGER' && !erAktivitetsfri) {
        return <FormattedMessage id="RedigeringPanel.Foreldrepenger" />;
    }
    if (periode.kontoType === 'FORELDREPENGER' && erAktivitetsfri) {
        return <FormattedMessage id="RedigeringPanel.UtenAktivitetskrav" />;
    }
    if (periode.kontoType === 'FELLESPERIODE') {
        return <FormattedMessage id="RedigeringPanel.Fellesperiode" />;
    }
    if (!periode.erAnnenPartEøs && periode.utsettelseÅrsak === 'LOVBESTEMT_FERIE') {
        return <FormattedMessage id="RedigeringPanel.Ferie" />;
    }
    return null;
};

const useSlettPeriodeFn = () => {
    const { sammenslåtteValgtePerioder, slettUttaksplanPerioder, setValgtePerioder } = useKalenderRedigeringContext();

    return (periodeSomSkalSlettes: { fom: string; tom: string; forelder?: BrukerRolleSak_fpoversikt }) => {
        const fomPeriodeSomSkalSlettes = dayjs(periodeSomSkalSlettes.fom);
        const tomPeriodeSomSkalSlettes = dayjs(periodeSomSkalSlettes.tom);

        const perioder = sammenslåtteValgtePerioder.filter(
            (p) =>
                fomPeriodeSomSkalSlettes.isSameOrBefore(dayjs(p.tom), 'day') &&
                tomPeriodeSomSkalSlettes.isSameOrAfter(dayjs(p.fom), 'day'),
        );

        slettUttaksplanPerioder(
            perioder.map(
                (p) =>
                    ({
                        fom: dayjs(p.fom).isBefore(periodeSomSkalSlettes.fom) ? periodeSomSkalSlettes.fom : p.fom,
                        tom: dayjs(p.tom).isAfter(periodeSomSkalSlettes.tom) ? periodeSomSkalSlettes.tom : p.tom,
                    }) satisfies UttakPeriode_fpoversikt,
            ),
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
