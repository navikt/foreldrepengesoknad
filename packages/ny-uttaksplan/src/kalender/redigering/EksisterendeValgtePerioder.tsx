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
import {
    BrukerRolleSak_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types/src/genererteTyper';
import { CalendarPeriod } from '@navikt/fp-ui';
import { UttaksdagenString } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { erEøsUttakPeriode, erVanligUttakPeriode } from '../../types/UttaksplanPeriode';
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';

export type UttakPeriodeMedAntallDager = (UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) & {
    valgteDagerIPeriode: number;
};

interface Props {
    perioder: UttakPeriodeMedAntallDager[];
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

                const erSamtidigUttak = erVanligUttakPeriode(p) && p.samtidigUttak !== undefined;
                const denAndrePerioden = erSamtidigUttak
                    ? perioder.find(
                          (per) =>
                              per.fom === p.fom &&
                              per.tom === p.tom &&
                              erVanligUttakPeriode(per) &&
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
                        <PeriodeIkon periode={p} erMedmorDelAvSøknaden={erMedmorDelAvSøknaden} />

                        <VStack gap="space-0">
                            {(erEøsUttakPeriode(p) || p.utsettelseÅrsak !== 'LOVBESTEMT_FERIE') && (
                                <Heading size="xsmall">
                                    <PeriodeHeaderText periode={p} erMedmorDelAvSøknaden={erMedmorDelAvSøknaden} />
                                </Heading>
                            )}

                            {!erSamtidigUttak && (
                                <HStack gap="space-4">
                                    <BodyShort>
                                        <PeriodeKvoteType periode={p} erMedmorDelAvSøknaden={erMedmorDelAvSøknaden} />
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
                                    {denAndrePerioden && erVanligUttakPeriode(denAndrePerioden) && (
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
                                    {erVanligUttakPeriode(p) && p.gradering !== undefined && (
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
                                        erVanligUttakPeriode(denAndrePerioden) &&
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

                            {!erSamtidigUttak && erVanligUttakPeriode(p) && p.gradering !== undefined && (
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
                        {!erEøsUttakPeriode(p) && (
                            <TrashIcon
                                title={intl.formatMessage({ id: 'RedigeringPanel.SlettPeriode' })}
                                fontSize="1.5rem"
                                className="cursor-pointer hover:opacity-70"
                                onClick={() => slettPeriode(p)}
                            />
                        )}
                    </HStack>
                );
            })}
        </VStack>
    );
};

const PeriodeIkon = ({
    periode,
    erMedmorDelAvSøknaden,
}: {
    periode: UttakPeriodeMedAntallDager;
    erMedmorDelAvSøknaden: boolean;
}) => {
    const intl = useIntl();

    if (erVanligUttakPeriode(periode) && periode.samtidigUttak !== undefined && periode.samtidigUttak > 0) {
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

    if (erVanligUttakPeriode(periode) && periode.utsettelseÅrsak === 'LOVBESTEMT_FERIE') {
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

    if (
        erVanligUttakPeriode(periode) &&
        (periode.forelder === 'MOR' || (periode.forelder === 'FAR_MEDMOR' && erMedmorDelAvSøknaden))
    ) {
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

    if (erEøsUttakPeriode(periode) || (periode.forelder === 'FAR_MEDMOR' && !erMedmorDelAvSøknaden)) {
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

const PeriodeHeaderText = ({
    periode,
    erMedmorDelAvSøknaden,
}: {
    periode: UttakPeriodeMedAntallDager;
    erMedmorDelAvSøknaden: boolean;
}) => {
    if (erVanligUttakPeriode(periode) && periode.samtidigUttak !== undefined) {
        return <FormattedMessage id="RedigeringPanel.Begge" />;
    }

    if (erVanligUttakPeriode(periode) && periode.forelder === 'MOR') {
        return <FormattedMessage id="RedigeringPanel.Mor" />;
    }

    if (erEøsUttakPeriode(periode) || (!erMedmorDelAvSøknaden && periode.forelder === 'FAR_MEDMOR')) {
        return <FormattedMessage id="RedigeringPanel.Far" />;
    }
    if (erMedmorDelAvSøknaden && periode.forelder === 'FAR_MEDMOR') {
        return <FormattedMessage id="RedigeringPanel.Medmor" />;
    }

    return null;
};

const PeriodeKvoteType = ({
    periode,
    erMedmorDelAvSøknaden,
}: {
    periode: UttakPeriodeMedAntallDager;
    erMedmorDelAvSøknaden: boolean;
}) => {
    if (erEøsUttakPeriode(periode)) {
        return <FormattedMessage id="RedigeringPanel.FarEøs" />;
    }

    const erAktivitetsfri =
        (periode.kontoType === 'FORELDREPENGER' || periode.oppholdÅrsak === 'FORELDREPENGER_ANNEN_FORELDER') &&
        periode.morsAktivitet === 'IKKE_OPPGITT';

    if (periode.kontoType === 'FORELDREPENGER_FØR_FØDSEL') {
        return <FormattedMessage id="RedigeringPanel.MorHarForeldrepengerFørFødsel" />;
    }
    if (periode.kontoType === 'MØDREKVOTE' || periode.oppholdÅrsak === 'MØDREKVOTE_ANNEN_FORELDER') {
        return <FormattedMessage id="RedigeringPanel.MorKvote" />;
    }
    if (
        !erMedmorDelAvSøknaden &&
        (periode.kontoType === 'FEDREKVOTE' || periode.oppholdÅrsak === 'FEDREKVOTE_ANNEN_FORELDER')
    ) {
        return <FormattedMessage id="RedigeringPanel.FarKvote" />;
    }
    if (
        erMedmorDelAvSøknaden &&
        (periode.kontoType === 'FEDREKVOTE' || periode.oppholdÅrsak === 'FEDREKVOTE_ANNEN_FORELDER')
    ) {
        return <FormattedMessage id="RedigeringPanel.MedmorKvote" />;
    }
    if (
        (periode.kontoType === 'FORELDREPENGER' || periode.oppholdÅrsak === 'FORELDREPENGER_ANNEN_FORELDER') &&
        !erAktivitetsfri
    ) {
        return <FormattedMessage id="RedigeringPanel.Foreldrepenger" />;
    }
    if (
        (periode.kontoType === 'FORELDREPENGER' || periode.oppholdÅrsak === 'FORELDREPENGER_ANNEN_FORELDER') &&
        erAktivitetsfri
    ) {
        return <FormattedMessage id="RedigeringPanel.UtenAktivitetskrav" />;
    }
    if (periode.kontoType === 'FELLESPERIODE' || periode.oppholdÅrsak === 'FELLESPERIODE_ANNEN_FORELDER') {
        return <FormattedMessage id="RedigeringPanel.Fellesperiode" />;
    }
    if (periode.utsettelseÅrsak === 'LOVBESTEMT_FERIE') {
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
                tom: UttaksdagenString.denneEllerForrige(fomSlett.subtract(1, 'day').format(ISO_DATE_FORMAT)).getDato(),
            });
        }

        // Behold delen av valgt periode som ligger etter delen som skal slettes
        if (tom.isAfter(tomSlett, 'day')) {
            nyePerioder.push({
                ...periode,
                fom: UttaksdagenString.denneEllerNeste(tomSlett.add(1, 'day').format(ISO_DATE_FORMAT)).getDato(),
                tom: periode.tom,
            });
        }

        return nyePerioder;
    });
};
