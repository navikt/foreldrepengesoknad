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
    UttakPeriode_fpoversikt,
    UttakUtsettelseÅrsak_fpoversikt,
} from '@navikt/fp-types/src/genererteTyper';
import { CalendarPeriod } from '@navikt/fp-ui';
import { UttaksdagenString } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../../../../context/UttaksplanDataContext';
import { SlettPeriodeForskyvEllerErstattPanel } from '../../../../../felles/forskyvEllerErstatt/SlettPeriodeForskyvEllerErstattPanel';
import { useVisForskyvEllerErstattPanel } from '../../../../../felles/forskyvEllerErstatt/useVisForskyvEllerErstattPanel';
import { UttakPeriodeMedAntallDager } from '../../../../../kalender/redigering/utils/kalenderPeriodeUtils';
import { erEøsUttakPeriode, erVanligUttakPeriode } from '../../../../../types/UttaksplanPeriode';
import {
    erDetEksisterendePerioderEtterValgtePerioder,
    harPeriodeDerMorsAktivitetIkkeErValgt,
} from '../../../../../utils/periodeUtils';
import { useKalenderRedigeringContext } from '../../../context/KalenderRedigeringContext';

interface Props {
    perioder: UttakPeriodeMedAntallDager[];
    setErForskyvEllerErstattPanelvisningPå: (skalVise: boolean) => void;
}

export const EksisterendeValgtePerioder = ({ perioder, setErForskyvEllerErstattPanelvisningPå }: Props) => {
    const intl = useIntl();

    const { sammenslåtteValgtePerioder } = useKalenderRedigeringContext();

    const [valgtPeriodeSomSkalSlettes, setValgtPeriodeSomSkalSlettes] = useState<
        UttakPeriodeMedAntallDager | undefined
    >(undefined);

    const { visEndreEllerForskyvPanel, setVisEndreEllerForskyvPanel } =
        useVisForskyvEllerErstattPanel(sammenslåtteValgtePerioder);

    const slettPeriode = useSlettPeriodeFn();

    const {
        foreldreInfo: { erMedmorDelAvSøknaden, søker, rettighetType },
        erPeriodeneTilAnnenPartLåst,
        uttakPerioder,
    } = useUttaksplanData();

    return (
        <VStack gap="space-12">
            {visEndreEllerForskyvPanel && valgtPeriodeSomSkalSlettes && (
                <SlettPeriodeForskyvEllerErstattPanel
                    valgtePerioder={finnDagerSomSkalSlettes(sammenslåtteValgtePerioder, valgtPeriodeSomSkalSlettes)}
                    avbryt={() => {
                        setValgtPeriodeSomSkalSlettes(undefined);
                        setVisEndreEllerForskyvPanel(false);
                        setErForskyvEllerErstattPanelvisningPå(false);
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
                        const erSamtidigUttaksperiodeSomAlleredeErHåndtert =
                            perioder.findIndex((per) => per.fom === p.fom && per.tom === p.tom) < index;
                        if (erSamtidigUttaksperiodeSomAlleredeErHåndtert) {
                            return null;
                        }

                        const erSamtidigUttak = erVanligUttakPeriode(p) && p.samtidigUttak !== undefined;

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
                                        <PeriodeKvoteType periode={p} erMedmorDelAvSøknaden={erMedmorDelAvSøknaden} />
                                    )}

                                    {erEøsUttakPeriode(p) && (
                                        <BodyShort>
                                            <FormattedMessage id="RedigeringPanel.EøsPeriode" />
                                        </BodyShort>
                                    )}

                                    {erSamtidigUttak && (
                                        <SamtidigUttak
                                            periode={p}
                                            allePerioder={perioder}
                                            erMedmorDelAvSøknaden={erMedmorDelAvSøknaden}
                                        />
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

                                    {harPeriodeDerMorsAktivitetIkkeErValgt(rettighetType, [p]) && (
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
                                                setErForskyvEllerErstattPanelvisningPå(true);
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

const SamtidigUttak = ({
    periode,
    allePerioder,
    erMedmorDelAvSøknaden,
}: {
    periode: UttakPeriode_fpoversikt;
    allePerioder: UttakPeriodeMedAntallDager[];
    erMedmorDelAvSøknaden: boolean;
}) => {
    const denAndrePerioden = allePerioder.find(
        (per) =>
            per.fom === periode.fom &&
            per.tom === periode.tom &&
            erVanligUttakPeriode(per) &&
            per.forelder !== periode.forelder,
    );

    return (
        <VStack gap="space-0">
            <BodyShort>
                <FormattedMessage
                    id="RedigeringPanel.SamtidigUttakForelder"
                    values={{
                        forelder: periode.forelder,
                        erMedmor: periode.forelder === 'FAR_MEDMOR' && erMedmorDelAvSøknaden,
                    }}
                />
                <FormattedMessage
                    id="RedigeringPanel.SamtidigUttak"
                    values={{
                        kvote: periode.kontoType,
                        prosent: periode.samtidigUttak,
                        erMedmor: periode.forelder === 'FAR_MEDMOR' && erMedmorDelAvSøknaden,
                    }}
                />
            </BodyShort>
            {denAndrePerioden && erVanligUttakPeriode(denAndrePerioden) && (
                <BodyShort>
                    <FormattedMessage
                        id="RedigeringPanel.SamtidigUttakForelder"
                        values={{
                            forelder: denAndrePerioden.forelder,
                            erMedmor: denAndrePerioden.forelder === 'FAR_MEDMOR' && erMedmorDelAvSøknaden,
                        }}
                    />
                    <FormattedMessage
                        id="RedigeringPanel.SamtidigUttak"
                        values={{
                            kvote: denAndrePerioden.kontoType,
                            prosent: denAndrePerioden.samtidigUttak,
                            erMedmor: periode.forelder === 'FAR_MEDMOR' && erMedmorDelAvSøknaden,
                        }}
                    />
                </BodyShort>
            )}
            {erVanligUttakPeriode(periode) && periode.gradering !== undefined && (
                <BodyShort>
                    <FormattedMessage
                        id="RedigeringPanel.GraderingForelder"
                        values={{
                            prosent: periode.gradering.arbeidstidprosent,
                            forelder: periode.forelder,
                            erMedmor: periode.forelder === 'FAR_MEDMOR' && erMedmorDelAvSøknaden,
                        }}
                    />
                </BodyShort>
            )}
            {denAndrePerioden && erVanligUttakPeriode(denAndrePerioden) && denAndrePerioden.gradering !== undefined && (
                <BodyShort>
                    <FormattedMessage
                        id="RedigeringPanel.GraderingForelder"
                        values={{
                            prosent: denAndrePerioden.gradering.arbeidstidprosent,
                            forelder: denAndrePerioden.forelder,
                            erMedmor: denAndrePerioden.forelder === 'FAR_MEDMOR' && erMedmorDelAvSøknaden,
                        }}
                    />
                </BodyShort>
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
        return (
            <BodyShort>
                <FormattedMessage id="RedigeringPanel.MorHarForeldrepengerFørFødsel" />
            </BodyShort>
        );
    }
    if (
        periode.kontoType === 'MØDREKVOTE' ||
        (erIkkeEøsUttakPeriode && periode.oppholdÅrsak === 'MØDREKVOTE_ANNEN_FORELDER')
    ) {
        return (
            <BodyShort>
                <FormattedMessage id="RedigeringPanel.MorKvote" />
            </BodyShort>
        );
    }
    if (
        !erMedmorDelAvSøknaden &&
        (periode.kontoType === 'FEDREKVOTE' ||
            (erIkkeEøsUttakPeriode && periode.oppholdÅrsak === 'FEDREKVOTE_ANNEN_FORELDER'))
    ) {
        return (
            <BodyShort>
                <FormattedMessage id="RedigeringPanel.FarKvote" />
            </BodyShort>
        );
    }
    if (
        erMedmorDelAvSøknaden &&
        (periode.kontoType === 'FEDREKVOTE' ||
            (erIkkeEøsUttakPeriode && periode.oppholdÅrsak === 'FEDREKVOTE_ANNEN_FORELDER'))
    ) {
        return (
            <BodyShort>
                <FormattedMessage id="RedigeringPanel.MedmorKvote" />
            </BodyShort>
        );
    }
    if (
        (periode.kontoType === 'FORELDREPENGER' ||
            (erIkkeEøsUttakPeriode && periode.oppholdÅrsak === 'FORELDREPENGER_ANNEN_FORELDER')) &&
        !erAktivitetsfri
    ) {
        return (
            <BodyShort>
                <FormattedMessage id="RedigeringPanel.Foreldrepenger" />
            </BodyShort>
        );
    }
    if (
        (periode.kontoType === 'FORELDREPENGER' ||
            (erIkkeEøsUttakPeriode && periode.oppholdÅrsak === 'FORELDREPENGER_ANNEN_FORELDER')) &&
        erAktivitetsfri
    ) {
        return (
            <BodyShort>
                <FormattedMessage id="RedigeringPanel.UtenAktivitetskrav" />
            </BodyShort>
        );
    }
    if (
        periode.kontoType === 'FELLESPERIODE' ||
        (erIkkeEøsUttakPeriode && periode.oppholdÅrsak === 'FELLESPERIODE_ANNEN_FORELDER')
    ) {
        return (
            <BodyShort>
                <FormattedMessage id="RedigeringPanel.Fellesperiode" />
            </BodyShort>
        );
    }
    if (erIkkeEøsUttakPeriode && periode.utsettelseÅrsak === 'LOVBESTEMT_FERIE') {
        return (
            <BodyShort>
                <FormattedMessage id="RedigeringPanel.Ferie" />
            </BodyShort>
        );
    }
    if (erIkkeEøsUttakPeriode && periode.utsettelseÅrsak && periode.utsettelseÅrsak !== 'LOVBESTEMT_FERIE') {
        if (periode.utsettelseÅrsak === 'FRI' && periode.morsAktivitet) {
            return (
                <HStack gap="space-4">
                    <FormattedMessage id="RedigeringPanel.Pause" />
                </HStack>
            );
        }

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
            perioder.map((p) => ({
                fom: dayjs(p.fom).isBefore(periodeSomSkalSlettes.fom) ? periodeSomSkalSlettes.fom : p.fom,
                tom: dayjs(p.tom).isAfter(periodeSomSkalSlettes.tom) ? periodeSomSkalSlettes.tom : p.tom,
            })),
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
