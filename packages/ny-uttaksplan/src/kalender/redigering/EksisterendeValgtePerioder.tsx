import {
    ArrowRightIcon,
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

import { Alert, BodyShort, HStack, Heading, Spacer, VStack } from '@navikt/ds-react';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import {
    BrukerRolleSak_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
    UttakUtsettelseÅrsak_fpoversikt,
} from '@navikt/fp-types/src/genererteTyper';
import { CalendarPeriod } from '@navikt/fp-ui';
import { UttaksdagenString } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { SlettPeriodeForskyvEllerErstatt } from '../../felles/forskyvEllerErstatt/SlettPeriodeForskyvEllerErstatt';
import { useVisForskyvEllerErstattPanel } from '../../felles/forskyvEllerErstatt/useVisForskyvEllerErstattPanel';
import { erEøsUttakPeriode, erVanligUttakPeriode } from '../../types/UttaksplanPeriode';
import {
    erDetEksisterendePerioderEtterValgtePerioder,
    harPeriodeDerMorsAktivitetIkkeErValgt,
} from '../../utils/periodeUtils';
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

    const { sammenslåtteValgtePerioder } = useKalenderRedigeringContext();

    const [valgtPeriodeSomSkalSlettes, setValgtPeriodeSomSkalSlettes] = useState<
        UttakPeriodeMedAntallDager | undefined
    >(undefined);

    const { visEndreEllerForskyvPanel, setVisEndreEllerForskyvPanel } =
        useVisForskyvEllerErstattPanel(sammenslåtteValgtePerioder);

    const slettPeriode = useSlettPeriodeFn();

    const {
        foreldreInfo: { erMedmorDelAvSøknaden, søker },
        erPeriodeneTilAnnenPartLåst,
        uttakPerioder,
    } = useUttaksplanData();

    return (
        <VStack gap="space-12">
            {visEndreEllerForskyvPanel && valgtPeriodeSomSkalSlettes && (
                <SlettPeriodeForskyvEllerErstatt
                    valgtePerioder={finnDagerSomSkalSlettes(sammenslåtteValgtePerioder, valgtPeriodeSomSkalSlettes)}
                    avbryt={() => {
                        setValgtPeriodeSomSkalSlettes(undefined);
                        setVisEndreEllerForskyvPanel(false);
                        setSkalViseKnapper(true);
                    }}
                    fjernPeriode={(skalForskyveBakover: boolean) => {
                        setValgtPeriodeSomSkalSlettes(undefined);
                        setVisEndreEllerForskyvPanel(false);
                        slettPeriode(valgtPeriodeSomSkalSlettes, skalForskyveBakover);
                    }}
                />
            )}
            {!visEndreEllerForskyvPanel && (
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

                        const erAvslåttPeriode = erVanligUttakPeriode(p) && p.resultat?.innvilget === false;

                        const erPleiepengerPeriode =
                            erAvslåttPeriode && p.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER';

                        const valgteDager = finnDagerSomSkalSlettes(sammenslåtteValgtePerioder, p);

                        const erEksisterendePerioderEtterValgteDager = erDetEksisterendePerioderEtterValgtePerioder(
                            uttakPerioder,
                            valgteDager,
                        );

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

                                    {erPleiepengerPeriode && (
                                        <BodyShort>
                                            <FormattedMessage
                                                id="RedigeringPanel.Pleiepenger"
                                                values={{ antall: p.valgteDagerIPeriode }}
                                            />
                                        </BodyShort>
                                    )}
                                    {erAvslåttPeriode && !erPleiepengerPeriode && (
                                        <BodyShort>
                                            <FormattedMessage id="RedigeringPanel.AvslåttPeriode" />
                                        </BodyShort>
                                    )}
                                    {harPeriodeDerMorsAktivitetIkkeErValgt([p]) && (
                                        <Alert variant="warning" size="small" className="mt-3 mb-1 p-2">
                                            <BodyShort>
                                                <FormattedMessage id="RedigeringPanel.MorsAktivitetIkkeValgt" />
                                            </BodyShort>
                                        </Alert>
                                    )}
                                </VStack>
                                <Spacer />
                                {!erEøsUttakPeriode(p) && !erAnnenPartsPeriodeLåst && !erPleiepengerPeriode && (
                                    <TrashIcon
                                        title={intl.formatMessage({ id: 'RedigeringPanel.SlettPeriode' })}
                                        fontSize="1.5rem"
                                        className="cursor-pointer hover:opacity-70"
                                        onClick={() => {
                                            if (erEksisterendePerioderEtterValgteDager) {
                                                setValgtPeriodeSomSkalSlettes(p);
                                                setVisEndreEllerForskyvPanel(true);
                                                setSkalViseKnapper(false);
                                            } else {
                                                slettPeriode(p, false);
                                            }
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

    if (erVanligUttakPeriode(periode) && periode.utsettelseÅrsak && periode.utsettelseÅrsak !== 'LOVBESTEMT_FERIE') {
        return (
            <ArrowRightIcon
                title={intl.formatMessage({ id: 'RedigeringPanel.Utsettelse' })}
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
    if (erIkkeEøsUttakPeriode && periode.utsettelseÅrsak && periode.utsettelseÅrsak !== 'LOVBESTEMT_FERIE') {
        return (
            <HStack gap="space-4">
                <FormattedMessage id="RedigeringPanel.Utsettelse" />:
                <BodyShort>{getUtsettelseÅrsakTekst(periode.utsettelseÅrsak)}</BodyShort>
            </HStack>
        );
    }
    return null;
};

const getUtsettelseÅrsakTekst = (utsettelseÅrsak: UttakUtsettelseÅrsak_fpoversikt) => {
    switch (utsettelseÅrsak) {
        case 'SØKER_SYKDOM':
            return <FormattedMessage id="LeggTilUtsettelsePanel.SøkerSykdom" />;
        case 'SØKER_INNLAGT':
            return <FormattedMessage id="LeggTilUtsettelsePanel.SøkerInnlagt" />;
        case 'BARN_INNLAGT':
            return <FormattedMessage id="LeggTilUtsettelsePanel.BarnInnlagt" />;
        default:
            return null;
    }
};

const useSlettPeriodeFn = () => {
    const { sammenslåtteValgtePerioder, slettUttaksplanPerioder, setValgtePerioder } = useKalenderRedigeringContext();

    return (
        periodeSomSkalSlettes: { fom: string; tom: string; forelder?: BrukerRolleSak_fpoversikt },
        skalForskyveBakover: boolean,
    ) => {
        const perioder = finnDagerSomSkalSlettes(sammenslåtteValgtePerioder, periodeSomSkalSlettes);

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

const finnDagerSomSkalSlettes = (
    sammenslåtteValgtePerioder: CalendarPeriod[],
    periodeSomSkalSlettes: {
        fom: string;
        tom: string;
        forelder?: BrukerRolleSak_fpoversikt;
    },
) => {
    const fomPeriodeSomSkalSlettes = dayjs(periodeSomSkalSlettes.fom);
    const tomPeriodeSomSkalSlettes = dayjs(periodeSomSkalSlettes.tom);

    return sammenslåtteValgtePerioder.filter(
        (p) =>
            fomPeriodeSomSkalSlettes.isSameOrBefore(dayjs(p.tom), 'day') &&
            tomPeriodeSomSkalSlettes.isSameOrAfter(dayjs(p.fom), 'day'),
    );
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
