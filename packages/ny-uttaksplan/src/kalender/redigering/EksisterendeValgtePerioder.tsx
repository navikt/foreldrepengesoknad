import {
    ParasolBeachIcon,
    PersonCircleFillIcon,
    PersonGroupIcon,
    PersonPregnantFillIcon,
    PersonSuitFillIcon,
    TrashIcon,
} from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useState } from 'react';
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
import { SlettPeriodeForskyvEllerErstatt } from '../../felles/forskyvEllerErstatt/SlettPeriodeForskyvEllerErstatt';
import { erEøsUttakPeriode, erVanligUttakPeriode } from '../../types/UttaksplanPeriode';
import { erNoenPerioderFørSeksUkerEtterFamiliehendelsesdato } from '../../utils/periodeUtils';
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';

export type UttakPeriodeMedAntallDager = (UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) & {
    valgteDagerIPeriode: number;
};

interface Props {
    perioder: UttakPeriodeMedAntallDager[];
    setSkalViseKnapper: (skalViseKnapper: boolean) => void;
}

export const EksisterendeValgtePerioder = ({ perioder, setSkalViseKnapper }: Props) => {
    const intl = useIntl();

    const [valgtPeriodeSomSkalSlettes, setValgtPeriodeSomSkalSlettes] = useState<
        UttakPeriodeMedAntallDager | undefined
    >(undefined);

    const slettPeriode = useSlettPeriodeFn();

    const {
        foreldreInfo: { erMedmorDelAvSøknaden, søker },
        erPeriodeneTilAnnenPartLåst,
        familiehendelsedato,
    } = useUttaksplanData();

    return (
        <VStack gap="space-12">
            {valgtPeriodeSomSkalSlettes && (
                <SlettPeriodeForskyvEllerErstatt
                    harPeriodeFørSeksUkerEtterFamiliehendelsedato={erNoenPerioderFørSeksUkerEtterFamiliehendelsesdato(
                        [valgtPeriodeSomSkalSlettes],
                        familiehendelsedato,
                    )}
                    avbryt={() => {
                        setValgtPeriodeSomSkalSlettes(undefined);
                        setSkalViseKnapper(true);
                    }}
                    fjernPeriode={(skalForskyveBakover: boolean) => {
                        setValgtPeriodeSomSkalSlettes(undefined);
                        slettPeriode(valgtPeriodeSomSkalSlettes, skalForskyveBakover);
                    }}
                />
            )}
            {!valgtPeriodeSomSkalSlettes && (
                <>
                    <BodyShort>
                        <FormattedMessage
                            id="RedigeringPanel.EksisterendePerioder"
                            values={{ antall: perioder.length }}
                        />
                    </BodyShort>
                    {perioder.map((p, index) => {
                        const harHåndtertAllerede =
                            perioder.findIndex((per) => per.fom === p.fom && per.tom === p.tom) < index;
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

                        const erAnnenPartsPeriodeLåst =
                            erPeriodeneTilAnnenPartLåst && erVanligUttakPeriode(p) && p.forelder !== søker;

                        return (
                            <HStack
                                gap="space-8"
                                key={`eksisterende-periode-${p.fom}-${p.tom}`}
                                wrap={false}
                                data-testid={`eksisterende-periode-${p.fom}-${p.tom}`}
                            >
                                <PeriodeIkon periode={p} søker={søker} erMedmorDelAvSøknaden={erMedmorDelAvSøknaden} />

                                <VStack gap="space-0">
                                    {(erEøsUttakPeriode(p) || p.utsettelseÅrsak !== 'LOVBESTEMT_FERIE') && (
                                        <Heading size="xsmall">
                                            <PeriodeHeaderText
                                                periode={p}
                                                erMedmorDelAvSøknaden={erMedmorDelAvSøknaden}
                                                søker={søker}
                                            />
                                        </Heading>
                                    )}

                                    {!erSamtidigUttak && (
                                        <HStack gap="space-4">
                                            <BodyShort>
                                                <PeriodeKvoteType
                                                    periode={p}
                                                    erMedmorDelAvSøknaden={erMedmorDelAvSøknaden}
                                                />
                                            </BodyShort>
                                        </HStack>
                                    )}
                                    {erEøsUttakPeriode(p) && (
                                        <BodyShort>
                                            <FormattedMessage id="RedigeringPanel.EøsPeriode" />
                                        </BodyShort>
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
                                                            erMedmor:
                                                                p.forelder === 'FAR_MEDMOR' && erMedmorDelAvSøknaden,
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
                                                            erMedmor:
                                                                p.forelder === 'FAR_MEDMOR' && erMedmorDelAvSøknaden,
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
                                {!erEøsUttakPeriode(p) && !erAnnenPartsPeriodeLåst && (
                                    <TrashIcon
                                        title={intl.formatMessage({ id: 'RedigeringPanel.SlettPeriode' })}
                                        fontSize="1.5rem"
                                        className="cursor-pointer hover:opacity-70"
                                        onClick={() => {
                                            setValgtPeriodeSomSkalSlettes(p);
                                            setSkalViseKnapper(false);
                                        }}
                                    />
                                )}
                            </HStack>
                        );
                    })}
                </>
            )}
        </VStack>
    );
};

const PeriodeIkon = ({
    periode,
    erMedmorDelAvSøknaden,
    søker,
}: {
    periode: UttakPeriodeMedAntallDager;
    erMedmorDelAvSøknaden: boolean;
    søker: BrukerRolleSak_fpoversikt;
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

    if (erEøsUttakPeriode(periode)) {
        if (søker === 'MOR') {
            if (erMedmorDelAvSøknaden) {
                return (
                    <PersonCircleFillIcon
                        title={intl.formatMessage({ id: 'RedigeringPanel.Medmor' })}
                        fontSize="1.5rem"
                        height="35px"
                        width="35px"
                        color="var(--ax-bg-success-strong)"
                    />
                );
            }
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

    if (periode.forelder === 'MOR' || (periode.forelder === 'FAR_MEDMOR' && erMedmorDelAvSøknaden)) {
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

    if (periode.forelder === 'FAR_MEDMOR' && !erMedmorDelAvSøknaden) {
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
    søker,
}: {
    periode: UttakPeriodeMedAntallDager;
    erMedmorDelAvSøknaden: boolean;
    søker: BrukerRolleSak_fpoversikt;
}) => {
    if (erEøsUttakPeriode(periode)) {
        if (søker === 'FAR_MEDMOR') {
            return <FormattedMessage id="RedigeringPanel.Mor" />;
        }
        return erMedmorDelAvSøknaden ? (
            <FormattedMessage id="RedigeringPanel.Medmor" />
        ) : (
            <FormattedMessage id="RedigeringPanel.Far" />
        );
    }

    if (erVanligUttakPeriode(periode) && periode.samtidigUttak !== undefined) {
        return <FormattedMessage id="RedigeringPanel.Begge" />;
    }

    if (erVanligUttakPeriode(periode) && periode.forelder === 'MOR') {
        return <FormattedMessage id="RedigeringPanel.Mor" />;
    }

    if (!erMedmorDelAvSøknaden && periode.forelder === 'FAR_MEDMOR') {
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
    const erIkkeEøsUttakPeriode = erVanligUttakPeriode(periode);

    const erAktivitetsfri =
        erIkkeEøsUttakPeriode &&
        (periode.kontoType === 'FORELDREPENGER' || periode.oppholdÅrsak === 'FORELDREPENGER_ANNEN_FORELDER') &&
        periode.morsAktivitet === 'IKKE_OPPGITT';

    if (periode.kontoType === 'FORELDREPENGER_FØR_FØDSEL') {
        return <FormattedMessage id="RedigeringPanel.MorHarForeldrepengerFørFødsel" />;
    }
    if (
        periode.kontoType === 'MØDREKVOTE' ||
        (erIkkeEøsUttakPeriode && periode.oppholdÅrsak === 'MØDREKVOTE_ANNEN_FORELDER')
    ) {
        return <FormattedMessage id="RedigeringPanel.MorKvote" />;
    }
    if (
        !erMedmorDelAvSøknaden &&
        (periode.kontoType === 'FEDREKVOTE' ||
            (erIkkeEøsUttakPeriode && periode.oppholdÅrsak === 'FEDREKVOTE_ANNEN_FORELDER'))
    ) {
        return <FormattedMessage id="RedigeringPanel.FarKvote" />;
    }
    if (
        erMedmorDelAvSøknaden &&
        (periode.kontoType === 'FEDREKVOTE' ||
            (erIkkeEøsUttakPeriode && periode.oppholdÅrsak === 'FEDREKVOTE_ANNEN_FORELDER'))
    ) {
        return <FormattedMessage id="RedigeringPanel.MedmorKvote" />;
    }
    if (
        (periode.kontoType === 'FORELDREPENGER' ||
            (erIkkeEøsUttakPeriode && periode.oppholdÅrsak === 'FORELDREPENGER_ANNEN_FORELDER')) &&
        !erAktivitetsfri
    ) {
        return <FormattedMessage id="RedigeringPanel.Foreldrepenger" />;
    }
    if (
        (periode.kontoType === 'FORELDREPENGER' ||
            (erIkkeEøsUttakPeriode && periode.oppholdÅrsak === 'FORELDREPENGER_ANNEN_FORELDER')) &&
        erAktivitetsfri
    ) {
        return <FormattedMessage id="RedigeringPanel.UtenAktivitetskrav" />;
    }
    if (
        periode.kontoType === 'FELLESPERIODE' ||
        (erIkkeEøsUttakPeriode && periode.oppholdÅrsak === 'FELLESPERIODE_ANNEN_FORELDER')
    ) {
        return <FormattedMessage id="RedigeringPanel.Fellesperiode" />;
    }
    if (erIkkeEøsUttakPeriode && periode.utsettelseÅrsak === 'LOVBESTEMT_FERIE') {
        return <FormattedMessage id="RedigeringPanel.Ferie" />;
    }
    return null;
};

const useSlettPeriodeFn = () => {
    const { sammenslåtteValgtePerioder, slettUttaksplanPerioder, setValgtePerioder } = useKalenderRedigeringContext();

    return (
        periodeSomSkalSlettes: { fom: string; tom: string; forelder?: BrukerRolleSak_fpoversikt },
        skalForskyveBakover: boolean,
    ) => {
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
            skalForskyveBakover,
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
