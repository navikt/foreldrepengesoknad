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
import type { ReactNode } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, BodyShort, Button, HStack, Heading, Spacer, Tooltip, VStack } from '@navikt/ds-react';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { BrukerRolleSak_fpoversikt, NavnPåForeldre, UtsettelseÅrsak_fpoversikt } from '@navikt/fp-types';
import { CalendarPeriod } from '@navikt/fp-ui';
import { Uttaksdagen, capitalizeFirstLetter, getNavnGenitivEierform } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../../../../context/UttaksplanDataContext';
import { UttakPeriodeMedAntallDager } from '../../../../../kalender/redigering/utils/kalenderPeriodeUtils';
import { getForelderVisningsnavnForFarOgFar } from '../../../../../liste/utils/uttaksplanListeUtils';
import { useEksisterendeValgtePeriodeAlerts } from '../../../../../regler/alert/informasjonsAlertHooks';
import { getVarighetString } from '../../../../../utils/dateUtils';
import { useKalenderRedigeringContext } from '../../../context/KalenderRedigeringContext';

interface Props {
    perioder: UttakPeriodeMedAntallDager[];
}

// Éin merga periode kan ha inntil tre sider samtidig (søker/annenPart/annenPartEøs). Denne fila
// vel søkjar si side når ho finst, elles annenPart si (opphald – søkjar har «pause» medan annan
// part har uttak), og fell attende til annenPartEøs berre for rein EØS-visning. Samtidig uttak
// (begge sider populert) blir handtert eksplisitt i SamtidigUttak-komponenten, som no kan lesa
// begge sidene direkte frå same rad i staden for å leita etter «den andre periode»-raden.
export const EksisterendeValgtePerioder = ({ perioder }: Props) => {
    const intl = useIntl();

    const slettPeriode = useSlettPeriodeFn();

    const {
        foreldreInfo: { erMedmorDelAvSøknaden, søker, navnPåForeldre, erFarOgFar },
        erPeriodeneTilAnnenPartLåst,
    } = useUttaksplanData();

    const alertsForPeriode = useEksisterendeValgtePeriodeAlerts();

    return (
        <VStack gap="space-12">
            <BodyShort>
                <FormattedMessage id="RedigeringPanel.EksisterendePerioder" values={{ antall: perioder.length }} />
            </BodyShort>
            {perioder.map((p) => {
                const side = p.søker ?? p.annenPart;

                const erSamtidigUttak = p.søker?.samtidigUttak !== undefined;

                const erAnnenPartsPeriodeLåst = erPeriodeneTilAnnenPartLåst && side?.forelder !== søker;

                const erAvslåttPeriode = side?.resultat?.innvilget === false;

                const erPleiepengerPeriode = erAvslåttPeriode && side?.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER';

                const {
                    morsAktivitetIkkeValgt: morsAktivitetIkkeValgtAlert,
                    graderingsaktivitetIkkeValgt: graderingsaktivitetIkkeValgtAlert,
                } = alertsForPeriode(p);

                return (
                    <HStack
                        gap="space-8"
                        key={`eksisterende-periode-${p.fom}-${p.tom}`}
                        wrap={false}
                        data-testid={`eksisterende-periode-${p.fom}-${p.tom}`}
                    >
                        <PeriodeIkon
                            periode={p}
                            søker={søker}
                            erMedmorDelAvSøknaden={erMedmorDelAvSøknaden}
                            erFarOgFar={erFarOgFar}
                            navnPåForeldre={navnPåForeldre}
                        />

                        <VStack gap="space-0">
                            {(!!p.annenPartEøs || side?.utsettelseÅrsak !== 'FERIE') && (
                                <Heading size="xsmall">
                                    <PeriodeHeaderText
                                        periode={p}
                                        erMedmorDelAvSøknaden={erMedmorDelAvSøknaden}
                                        søker={søker}
                                        erFarOgFar={erFarOgFar}
                                        navnPåForeldre={navnPåForeldre}
                                    />
                                </Heading>
                            )}

                            {!erSamtidigUttak && (
                                <PeriodeKvoteType
                                    periode={p}
                                    erMedmorDelAvSøknaden={erMedmorDelAvSøknaden}
                                    erFarOgFar={erFarOgFar}
                                    navnPåForeldre={navnPåForeldre}
                                />
                            )}

                            {!!p.annenPartEøs && (
                                <BodyShort>
                                    <FormattedMessage id="RedigeringPanel.EøsPeriode" />
                                </BodyShort>
                            )}

                            {erSamtidigUttak && (
                                <SamtidigUttak periode={p} erMedmorDelAvSøknaden={erMedmorDelAvSøknaden} />
                            )}

                            {!erSamtidigUttak && side?.gradering !== undefined && (
                                <BodyShort>
                                    <FormattedMessage
                                        id="RedigeringPanel.Gradering"
                                        values={{ prosent: side.gradering.arbeidstidprosent }}
                                    />
                                </BodyShort>
                            )}

                            <BodyShort>{getVarighetString(p.valgteDagerIPeriode, intl, 'kompakt')}</BodyShort>

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

                            {morsAktivitetIkkeValgtAlert && (
                                <Alert
                                    variant={morsAktivitetIkkeValgtAlert.variant}
                                    size="small"
                                    className="mt-3 mb-1 p-2"
                                >
                                    <BodyShort>{morsAktivitetIkkeValgtAlert.melding}</BodyShort>
                                </Alert>
                            )}

                            {graderingsaktivitetIkkeValgtAlert && (
                                <Alert
                                    variant={graderingsaktivitetIkkeValgtAlert.variant}
                                    size="small"
                                    className="mt-3 mb-1 p-2"
                                >
                                    <BodyShort>{graderingsaktivitetIkkeValgtAlert.melding}</BodyShort>
                                </Alert>
                            )}
                        </VStack>
                        <Spacer />

                        {!p.annenPartEøs && !erAnnenPartsPeriodeLåst && !erPleiepengerPeriode && (
                            <Tooltip content={intl.formatMessage({ id: 'RedigeringPanel.SlettPeriode' })}>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="small"
                                    data-color="danger"
                                    icon={<TrashIcon aria-hidden />}
                                    aria-label={intl.formatMessage({ id: 'RedigeringPanel.SlettPeriode' })}
                                    className="self-start"
                                    onClick={() => {
                                        slettPeriode(p, false);
                                    }}
                                />
                            </Tooltip>
                        )}
                    </HStack>
                );
            })}
        </VStack>
    );
};

const SamtidigUttak = ({
    periode,
    erMedmorDelAvSøknaden,
}: {
    periode: UttakPeriodeMedAntallDager;
    erMedmorDelAvSøknaden: boolean;
}) => {
    const { søker, annenPart } = periode;

    return (
        <VStack gap="space-0">
            {søker && (
                <BodyShort>
                    <FormattedMessage
                        id="RedigeringPanel.SamtidigUttakForelder"
                        values={{
                            forelder: søker.forelder,
                            erMedmor: søker.forelder === 'FAR_MEDMOR' && erMedmorDelAvSøknaden,
                        }}
                    />
                    <FormattedMessage
                        id="RedigeringPanel.SamtidigUttak"
                        values={{
                            kvote: søker.kontoType,
                            prosent: søker.samtidigUttak,
                            erMedmor: søker.forelder === 'FAR_MEDMOR' && erMedmorDelAvSøknaden,
                        }}
                    />
                </BodyShort>
            )}
            {annenPart && (
                <BodyShort>
                    <FormattedMessage
                        id="RedigeringPanel.SamtidigUttakForelder"
                        values={{
                            forelder: annenPart.forelder,
                            erMedmor: annenPart.forelder === 'FAR_MEDMOR' && erMedmorDelAvSøknaden,
                        }}
                    />
                    <FormattedMessage
                        id="RedigeringPanel.SamtidigUttak"
                        values={{
                            kvote: annenPart.kontoType,
                            prosent: annenPart.samtidigUttak,
                            erMedmor: søker?.forelder === 'FAR_MEDMOR' && erMedmorDelAvSøknaden,
                        }}
                    />
                </BodyShort>
            )}
            {søker?.gradering !== undefined && (
                <BodyShort>
                    <FormattedMessage
                        id="RedigeringPanel.GraderingForelder"
                        values={{
                            prosent: søker.gradering.arbeidstidprosent,
                            forelder: søker.forelder,
                            erMedmor: søker.forelder === 'FAR_MEDMOR' && erMedmorDelAvSøknaden,
                        }}
                    />
                </BodyShort>
            )}
            {annenPart?.gradering !== undefined && (
                <BodyShort>
                    <FormattedMessage
                        id="RedigeringPanel.GraderingForelder"
                        values={{
                            prosent: annenPart.gradering.arbeidstidprosent,
                            forelder: annenPart.forelder,
                            erMedmor: annenPart.forelder === 'FAR_MEDMOR' && erMedmorDelAvSøknaden,
                        }}
                    />
                </BodyShort>
            )}
        </VStack>
    );
};

/**
 * Viser kvotenavn for en periode. Når begge foreldrene er fedre (erFarOgFar) finnes det ingen
 * "mor"/"far"-rolle å referere til, så vi bruker forelderens faktiske navn i genitivsform i
 * stedet for den faste "fallback"-teksten (RedigeringPanel.MorKvote/FarKvote).
 */
const KvoteNavnEllerFallback = ({
    erFarOgFar,
    navn,
    fallback,
}: {
    erFarOgFar?: boolean;
    navn: string;
    fallback: ReactNode;
}) => {
    const intl = useIntl();
    if (!erFarOgFar) {
        return fallback;
    }
    return (
        <FormattedMessage
            id="uttaksplan.stønadskvotetype.foreldernavn.kvote"
            values={{ navn: getNavnGenitivEierform(capitalizeFirstLetter(navn), intl.locale) }}
        />
    );
};

const PeriodeIkon = ({
    periode,
    erMedmorDelAvSøknaden,
    søker,
    erFarOgFar,
    navnPåForeldre,
}: {
    periode: UttakPeriodeMedAntallDager;
    erMedmorDelAvSøknaden: boolean;
    søker: BrukerRolleSak_fpoversikt;
    erFarOgFar?: boolean;
    navnPåForeldre: NavnPåForeldre;
}) => {
    const intl = useIntl();
    const side = periode.søker ?? periode.annenPart;

    if (side?.samtidigUttak !== undefined && side.samtidigUttak > 0) {
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

    if (side?.utsettelseÅrsak === 'FERIE') {
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

    if (side?.utsettelseÅrsak && side.utsettelseÅrsak !== 'FERIE') {
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

    if (periode.annenPartEøs) {
        if (erFarOgFar) {
            return (
                <PersonSuitFillIcon
                    title={getForelderVisningsnavnForFarOgFar(søker === 'MOR' ? 'FAR_MEDMOR' : 'MOR', navnPåForeldre)}
                    fontSize="1.5rem"
                    height="35px"
                    width="35px"
                    color="var(--ax-bg-success-strong)"
                />
            );
        }
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

    if (erFarOgFar && (side?.forelder === 'MOR' || side?.forelder === 'FAR_MEDMOR')) {
        return (
            <PersonSuitFillIcon
                title={getForelderVisningsnavnForFarOgFar(side.forelder, navnPåForeldre)}
                fontSize="1.5rem"
                height="35px"
                width="35px"
                color="var(--ax-bg-success-strong)"
            />
        );
    }

    if (side?.forelder === 'MOR' || (side?.forelder === 'FAR_MEDMOR' && erMedmorDelAvSøknaden)) {
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

    if (side?.forelder === 'FAR_MEDMOR' && !erMedmorDelAvSøknaden) {
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
    erFarOgFar,
    navnPåForeldre,
}: {
    periode: UttakPeriodeMedAntallDager;
    erMedmorDelAvSøknaden: boolean;
    søker: BrukerRolleSak_fpoversikt;
    erFarOgFar?: boolean;
    navnPåForeldre: NavnPåForeldre;
}) => {
    const erEøs = !!periode.annenPartEøs;
    const side = periode.søker ?? periode.annenPart;
    const forelderVanligPeriode = side?.forelder;

    // Regler i prioritert rekkefølge – første regel som slår til (gjelder === true) avgjør teksten.
    const regler: Array<{ gjelder: boolean; render: () => ReactNode }> = [
        {
            gjelder: erEøs && !!erFarOgFar,
            render: () => (
                <>{getForelderVisningsnavnForFarOgFar(søker === 'MOR' ? 'FAR_MEDMOR' : 'MOR', navnPåForeldre)}</>
            ),
        },
        {
            gjelder: erEøs && søker === 'FAR_MEDMOR',
            render: () => <FormattedMessage id="RedigeringPanel.Mor" />,
        },
        {
            gjelder: erEøs && erMedmorDelAvSøknaden,
            render: () => <FormattedMessage id="RedigeringPanel.Medmor" />,
        },
        {
            gjelder: erEøs,
            render: () => <FormattedMessage id="RedigeringPanel.Far" />,
        },
        {
            gjelder: !erEøs && side?.samtidigUttak !== undefined,
            render: () => <FormattedMessage id="RedigeringPanel.Begge" />,
        },
        {
            gjelder: !!erFarOgFar && (forelderVanligPeriode === 'MOR' || forelderVanligPeriode === 'FAR_MEDMOR'),
            render: () => <>{getForelderVisningsnavnForFarOgFar(forelderVanligPeriode!, navnPåForeldre)}</>,
        },
        {
            gjelder: forelderVanligPeriode === 'MOR',
            render: () => <FormattedMessage id="RedigeringPanel.Mor" />,
        },
        {
            gjelder: !erMedmorDelAvSøknaden && forelderVanligPeriode === 'FAR_MEDMOR',
            render: () => <FormattedMessage id="RedigeringPanel.Far" />,
        },
        {
            gjelder: erMedmorDelAvSøknaden && forelderVanligPeriode === 'FAR_MEDMOR',
            render: () => <FormattedMessage id="RedigeringPanel.Medmor" />,
        },
    ];

    const treff = regler.find((regel) => regel.gjelder);
    return treff ? treff.render() : null;
};

const PeriodeKvoteType = ({
    periode,
    erMedmorDelAvSøknaden,
    erFarOgFar,
    navnPåForeldre,
}: {
    periode: UttakPeriodeMedAntallDager;
    erMedmorDelAvSøknaden: boolean;
    erFarOgFar?: boolean;
    navnPåForeldre: NavnPåForeldre;
}) => {
    const {
        foreldreInfo: { søker, rettighetType },
    } = useUttaksplanData();

    // Sida sin eigen kontoType dekker no det den gamle oppholdÅrsak-suffiksen (t.d.
    // MØDREKVOTE_ANNEN_FORELDER) gjorde: for opphaldsrader (kun annenPart har uttak) er det
    // annenPart sin *eigen* kontoType (t.d. MØDREKVOTE) som styrer teksten, utan noko eige
    // «opphald»-uttrykk.
    const side = periode.søker ?? periode.annenPart;
    const utsettelseÅrsak = side?.utsettelseÅrsak;

    const erAktivitetsfri = side?.kontoType === 'FORELDREPENGER' && side?.morsAktivitet === 'IKKE_OPPGITT';

    const bareFarMedmorHarRett = søker === 'FAR_MEDMOR' && rettighetType === 'BARE_SØKER_RETT';
    const erSøkersForeldrepengerMedAktivitetskrav =
        !!periode.søker && side?.kontoType === 'FORELDREPENGER' && !erAktivitetsfri;

    const erMødrekvote = side?.kontoType === 'MØDREKVOTE';
    const erFedrekvote = side?.kontoType === 'FEDREKVOTE';
    const erForeldrepenger = side?.kontoType === 'FORELDREPENGER';
    const erFellesperiode = side?.kontoType === 'FELLESPERIODE';
    const erAnnenUtsettelseEnnFerie = utsettelseÅrsak !== undefined && utsettelseÅrsak !== 'FERIE';

    // Regler i prioritert rekkefølge – første regel som slår til (gjelder === true) avgjør teksten.
    const regler: Array<{ gjelder: boolean; render: () => ReactNode }> = [
        {
            gjelder: side?.kontoType === 'FORELDREPENGER_FØR_FØDSEL',
            render: () => <FormattedMessage id="RedigeringPanel.MorHarForeldrepengerFørFødsel" />,
        },
        {
            gjelder: erMødrekvote,
            render: () => (
                <KvoteNavnEllerFallback
                    erFarOgFar={erFarOgFar}
                    navn={navnPåForeldre.mor}
                    fallback={<FormattedMessage id="RedigeringPanel.MorKvote" />}
                />
            ),
        },
        {
            gjelder: !erMedmorDelAvSøknaden && erFedrekvote,
            render: () => (
                <KvoteNavnEllerFallback
                    erFarOgFar={erFarOgFar}
                    navn={navnPåForeldre.farMedmor}
                    fallback={<FormattedMessage id="RedigeringPanel.FarKvote" />}
                />
            ),
        },
        {
            gjelder: erMedmorDelAvSøknaden && erFedrekvote,
            render: () => <FormattedMessage id="RedigeringPanel.MedmorKvote" />,
        },
        {
            gjelder: erSøkersForeldrepengerMedAktivitetskrav && bareFarMedmorHarRett,
            render: () => <FormattedMessage id="RedigeringPanel.MedAktivitetskrav" />,
        },
        {
            gjelder: erForeldrepenger && !erAktivitetsfri,
            render: () => <FormattedMessage id="RedigeringPanel.Foreldrepenger" />,
        },
        {
            gjelder: erForeldrepenger && erAktivitetsfri,
            render: () => <FormattedMessage id="RedigeringPanel.UtenAktivitetskrav" />,
        },
        {
            gjelder: erFellesperiode,
            render: () => <FormattedMessage id="RedigeringPanel.Fellesperiode" />,
        },
        {
            gjelder: utsettelseÅrsak === 'FERIE',
            render: () => <FormattedMessage id="RedigeringPanel.Ferie" />,
        },
        {
            gjelder: erAnnenUtsettelseEnnFerie && utsettelseÅrsak === 'FRI' && !!side?.morsAktivitet,
            render: () => <FormattedMessage id="RedigeringPanel.Pause" />,
        },
        {
            gjelder: erAnnenUtsettelseEnnFerie,
            render: () => (
                <>
                    <span>
                        <FormattedMessage id="RedigeringPanel.Utsettelse" />:
                    </span>
                    <BodyShort>{utsettelseÅrsak && getUtsettelseÅrsakTekst(utsettelseÅrsak)}</BodyShort>
                </>
            ),
        },
    ];

    const treff = regler.find((regel) => regel.gjelder);
    if (!treff) {
        return null;
    }

    if (erAnnenUtsettelseEnnFerie) {
        return <HStack gap="space-4">{treff.render()}</HStack>;
    }
    return <BodyShort>{treff.render()}</BodyShort>;
};

const getUtsettelseÅrsakTekst = (utsettelseÅrsak: UtsettelseÅrsak_fpoversikt) => {
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
                tom: Uttaksdagen.denneEllerForrige(fomSlett.subtract(1, 'day').format(ISO_DATE_FORMAT)).getDato(),
            });
        }

        // Behold delen av valgt periode som ligger etter delen som skal slettes
        if (tom.isAfter(tomSlett, 'day')) {
            nyePerioder.push({
                ...periode,
                fom: Uttaksdagen.denneEllerNeste(tomSlett.add(1, 'day').format(ISO_DATE_FORMAT)).getDato(),
                tom: periode.tom,
            });
        }

        return nyePerioder;
    });
};
