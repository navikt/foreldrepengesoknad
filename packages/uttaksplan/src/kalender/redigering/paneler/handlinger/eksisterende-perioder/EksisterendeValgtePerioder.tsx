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
import { ReactNode } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, BodyShort, Button, HStack, Heading, Spacer, Tooltip, VStack } from '@navikt/ds-react';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import {
    BrukerRolleSak_fpoversikt,
    NavnPåForeldre,
    UttakPeriode_fpoversikt,
    UttakUtsettelseÅrsak_fpoversikt,
} from '@navikt/fp-types';
import { CalendarPeriod } from '@navikt/fp-ui';
import { Uttaksdagen, capitalizeFirstLetter, getNavnGenitivEierform } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../../../../context/UttaksplanDataContext';
import { UttakPeriodeMedAntallDager } from '../../../../../kalender/redigering/utils/kalenderPeriodeUtils';
import { useEksisterendeValgtePeriodeAlerts } from '../../../../../regler/alert/informasjonsAlertHooks';
import { erEøsUttakPeriode, erVanligUttakPeriode } from '../../../../../types/UttaksplanPeriode';
import { getVarighetString } from '../../../../../utils/dateUtils';
import { useKalenderRedigeringContext } from '../../../context/KalenderRedigeringContext';

interface Props {
    perioder: UttakPeriodeMedAntallDager[];
}

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

                const erPleiepengerPeriode = erAvslåttPeriode && p.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER';

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
                            {(erEøsUttakPeriode(p) || p.utsettelseÅrsak !== 'LOVBESTEMT_FERIE') && (
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

                        {!erEøsUttakPeriode(p) && !erAnnenPartsPeriodeLåst && !erPleiepengerPeriode && (
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

/**
 * Visningsnavn for en gitt domenerolle (MOR/FAR_MEDMOR) når begge foreldrene er fedre
 * (f.eks. adopsjon). Da representerer ikke MOR/FAR_MEDMOR en mor og en far, men to fedre –
 * så vi viser forelderens faktiske navn (eller "Far 1"/"Far 2") i stedet for generisk
 * "Mor"/"Far"-tekst.
 */
const getForelderVisningsnavnForFarOgFar = (
    forelder: BrukerRolleSak_fpoversikt,
    navnPåForeldre: NavnPåForeldre,
): string => capitalizeFirstLetter(forelder === 'MOR' ? navnPåForeldre.mor : navnPåForeldre.farMedmor);

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

    if (erFarOgFar && (periode.forelder === 'MOR' || periode.forelder === 'FAR_MEDMOR')) {
        return (
            <PersonSuitFillIcon
                title={getForelderVisningsnavnForFarOgFar(periode.forelder, navnPåForeldre)}
                fontSize="1.5rem"
                height="35px"
                width="35px"
                color="var(--ax-bg-success-strong)"
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
    erFarOgFar,
    navnPåForeldre,
}: {
    periode: UttakPeriodeMedAntallDager;
    erMedmorDelAvSøknaden: boolean;
    søker: BrukerRolleSak_fpoversikt;
    erFarOgFar?: boolean;
    navnPåForeldre: NavnPåForeldre;
}) => {
    const erEøs = erEøsUttakPeriode(periode);
    const erVanlig = erVanligUttakPeriode(periode);
    const forelderVanligPeriode = erVanlig ? periode.forelder : undefined;

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
            gjelder: erVanlig && periode.samtidigUttak !== undefined,
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

    const erIkkeEøsUttakPeriode = erVanligUttakPeriode(periode);
    const utsettelseÅrsak = erIkkeEøsUttakPeriode ? periode.utsettelseÅrsak : undefined;

    const erAktivitetsfri =
        erIkkeEøsUttakPeriode &&
        (periode.kontoType === 'FORELDREPENGER' || periode.oppholdÅrsak === 'FORELDREPENGER_ANNEN_FORELDER') &&
        periode.morsAktivitet === 'IKKE_OPPGITT';

    const bareFarMedmorHarRett = søker === 'FAR_MEDMOR' && rettighetType === 'BARE_SØKER_RETT';
    const erSøkersForeldrepengerMedAktivitetskrav =
        erIkkeEøsUttakPeriode &&
        periode.forelder === søker &&
        periode.kontoType === 'FORELDREPENGER' &&
        !erAktivitetsfri;

    const erMødrekvote =
        periode.kontoType === 'MØDREKVOTE' ||
        (erIkkeEøsUttakPeriode && periode.oppholdÅrsak === 'MØDREKVOTE_ANNEN_FORELDER');
    const erFedrekvote =
        periode.kontoType === 'FEDREKVOTE' ||
        (erIkkeEøsUttakPeriode && periode.oppholdÅrsak === 'FEDREKVOTE_ANNEN_FORELDER');
    const erForeldrepenger =
        periode.kontoType === 'FORELDREPENGER' ||
        (erIkkeEøsUttakPeriode && periode.oppholdÅrsak === 'FORELDREPENGER_ANNEN_FORELDER');
    const erFellesperiode =
        periode.kontoType === 'FELLESPERIODE' ||
        (erIkkeEøsUttakPeriode && periode.oppholdÅrsak === 'FELLESPERIODE_ANNEN_FORELDER');
    const erAnnenUtsettelseEnnFerie = utsettelseÅrsak !== undefined && utsettelseÅrsak !== 'LOVBESTEMT_FERIE';

    // Regler i prioritert rekkefølge – første regel som slår til (gjelder === true) avgjør teksten.
    const regler: Array<{ gjelder: boolean; render: () => ReactNode }> = [
        {
            gjelder: periode.kontoType === 'FORELDREPENGER_FØR_FØDSEL',
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
            gjelder: utsettelseÅrsak === 'LOVBESTEMT_FERIE',
            render: () => <FormattedMessage id="RedigeringPanel.Ferie" />,
        },
        {
            gjelder:
                erAnnenUtsettelseEnnFerie &&
                utsettelseÅrsak === 'FRI' &&
                !!(erVanligUttakPeriode(periode) && periode.morsAktivitet),
            render: () => <FormattedMessage id="RedigeringPanel.Pause" />,
        },
        {
            gjelder: erAnnenUtsettelseEnnFerie,
            render: () => (
                <>
                    <FormattedMessage id="RedigeringPanel.Utsettelse" />:
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
