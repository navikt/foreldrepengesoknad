import { CalendarIcon } from '@navikt/aksel-icons';
import { CalendarLabels } from 'components/labels/CalendarLabels';
import { FormattedMessage, useIntl } from 'react-intl';
import { barnehagestartDato } from 'steps/barnehageplass/BarnehageplassSteg';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { Fordeling } from 'types/Fordeling';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';
import {
    erAlenesøker,
    getErFarEllerMedmor,
    getFornavnPåSøker1,
    getFornavnPåSøker2,
    getNavnGenitivEierform,
} from 'utils/HvemPlanleggerUtils';
import { loggExpansionCardOpen } from 'utils/amplitudeUtils';
import { harKunFarSøker1Rett, harKunMedmorEllerFarSøker2Rett, utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import {
    getAntallUkerOgDager,
    getAntallUkerOgDagerAktivitetsfriKvote,
    getAntallUkerOgDagerFellesperiode,
    getUkerOgDager,
} from 'utils/stønadskontoerUtils';
import {
    finnAntallUkerOgDagerMedForeldrepenger,
    getAnnenpartsPerioder,
    getFamiliehendelsedato,
    getSøkersPerioder,
    lagForslagTilPlan,
} from 'utils/uttakUtils';

import { BodyLong, BodyShort, ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import { HvemPlanleggerType, TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { BluePanel, IconCircleWrapper } from '@navikt/fp-ui';
import { UttaksdagenString, capitalizeFirstLetter } from '@navikt/fp-utils';
import { UttaksplanKalender } from '@navikt/fp-uttaksplan-kalender-ny';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData } from '../../../app-data/PlanleggerDataContext';
import { erBarnetAdoptert, mapOmBarnetTilBarn } from '../../../utils/barnetUtils';

interface Props {
    valgtStønadskonto: TilgjengeligeStønadskontoerForDekningsgrad;
    hvorLangPeriode: HvorLangPeriode;
    hvemPlanlegger: HvemPlanlegger;
    barnet: OmBarnet;
    arbeidssituasjon: Arbeidssituasjon;
    fordeling?: Fordeling;
}

export const OppsummeringHarRett = ({
    valgtStønadskonto,
    hvorLangPeriode,
    hvemPlanlegger,
    barnet,
    arbeidssituasjon,
    fordeling,
}: Props) => {
    const intl = useIntl();

    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);

    const familiehendelsedato = getFamiliehendelsedato(barnet);

    const antallDagerFellesperiode = getAntallUkerOgDagerFellesperiode(valgtStønadskonto).totaltAntallDager;
    const antallUkerOgDagerFellesperiodeSøker1 = fordeling ? getUkerOgDager(fordeling.antallDagerSøker1) : undefined;
    const antallUkerOgDagerFellesperiodeSøker2 = fordeling
        ? getUkerOgDager(antallDagerFellesperiode - fordeling.antallDagerSøker1)
        : undefined;
    const antallUkerOgDagerAktivitetsfriKvote = getAntallUkerOgDagerAktivitetsfriKvote(valgtStønadskonto);
    const bareFarMedmorHarRett =
        harKunMedmorEllerFarSøker2Rett(hvemHarRett, hvemPlanlegger) || harKunFarSøker1Rett(hvemHarRett, hvemPlanlegger);

    let startdato = undefined;

    if (
        (hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR ||
            hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_FAR) &&
        hvemHarRett === 'kunSøker2HarRett'
    ) {
        startdato = UttaksdagenString(UttaksdagenString(familiehendelsedato).denneEllerNeste()).leggTil(30);
    }

    const erFarEllerMedmor = getErFarEllerMedmor(hvemPlanlegger, hvemHarRett);

    const planforslag = lagForslagTilPlan({
        erDeltUttak: fordeling !== undefined,
        famDato: familiehendelsedato,
        tilgjengeligeStønadskontoer: valgtStønadskonto.kontoer,
        fellesperiodeDagerMor: fordeling?.antallDagerSøker1,
        bareFarMedmorHarRett,
        erAdopsjon: erBarnetAdoptert(barnet),
        erFarEllerMedmor: erFarEllerMedmor,
        startdato,
        erMorUfør: arbeidssituasjon?.status === Arbeidsstatus.UFØR,
        erAleneOmOmsorg:
            hvemPlanlegger.type === HvemPlanleggerType.FAR || hvemPlanlegger.type === HvemPlanleggerType.MOR,
        farOgFar: hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR,
    });

    const ukerOgDagerMedForeldrepenger = finnAntallUkerOgDagerMedForeldrepenger(valgtStønadskonto);

    const erFarOgFar = hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR;
    const fornavnSøker1 = getFornavnPåSøker1(hvemPlanlegger, intl);
    const fornavnSøker1Genitiv = getNavnGenitivEierform(fornavnSøker1, intl.locale);
    const fornavnSøker2 = getFornavnPåSøker2(hvemPlanlegger, intl);
    const fornavnSøker2Genitiv = fornavnSøker2 ? getNavnGenitivEierform(fornavnSøker2, intl.locale) : undefined;

    const barnehagestartdato = barnehagestartDato(barnet);

    const uttaksplan = useContextGetData(ContextDataType.UTTAKSPLAN);
    const tilpassPlan = notEmpty(useContextGetData(ContextDataType.TILPASS_PLAN));
    const gjeldendeUttaksplan = uttaksplan && uttaksplan.length > 0 ? uttaksplan[uttaksplan.length - 1] : [];
    const erDeltUttak = fordeling !== undefined;

    const søkersPerioder = getSøkersPerioder(erDeltUttak, gjeldendeUttaksplan, erFarEllerMedmor);
    const annenPartsPerioder = getAnnenpartsPerioder(erDeltUttak, gjeldendeUttaksplan, erFarEllerMedmor);

    return (
        <VStack gap="10">
            <ExpansionCard aria-label="" onToggle={loggExpansionCardOpen('toggle-oppgitt-informasjon')} size="small">
                <ExpansionCard.Header>
                    <HStack gap="6" align="center" wrap={false}>
                        <IconCircleWrapper size="medium" color="lightBlue">
                            <CalendarIcon height={24} width={24} fontSize="1.5rem" aria-hidden />
                        </IconCircleWrapper>
                        <ExpansionCard.Title size="small">
                            <FormattedMessage
                                id="PlanenDeresOppsummering.Tittel"
                                values={{ erAlenesøker: erAlenesøker(hvemPlanlegger) }}
                            />
                        </ExpansionCard.Title>
                    </HStack>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <VStack gap="5">
                        {hvemHarRett === 'beggeHarRett' && !erFarOgFar && fornavnSøker2 && fornavnSøker2Genitiv && (
                            <BluePanel>
                                <VStack gap="2">
                                    <BodyLong>
                                        <FormattedMessage
                                            id="OppsummeringSteg.DereValgte"
                                            values={{
                                                prosent: hvorLangPeriode.dekningsgrad,
                                                antallUker: ukerOgDagerMedForeldrepenger.uker,
                                                antallDager: ukerOgDagerMedForeldrepenger.dager,
                                                hvem: getFornavnPåSøker1(hvemPlanlegger, intl),
                                                hvem2: getFornavnPåSøker2(hvemPlanlegger, intl),
                                                uker: antallUkerOgDagerFellesperiodeSøker1?.uker || 0,
                                                dager: antallUkerOgDagerFellesperiodeSøker1?.dager || 0,
                                                uker2: antallUkerOgDagerFellesperiodeSøker2?.uker || 0,
                                                dager2: antallUkerOgDagerFellesperiodeSøker2?.dager || 0,
                                            }}
                                        />
                                    </BodyLong>

                                    <BodyLong>
                                        <FormattedMessage
                                            id="OppsummeringSteg.Periodene"
                                            values={{
                                                hvem: capitalizeFirstLetter(fornavnSøker1Genitiv),
                                                fom: intl.formatDate(planforslag.søker1[0].fom, {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                }),
                                                tom: intl.formatDate(
                                                    planforslag.søker1[planforslag.søker1.length - 1].tom,
                                                    {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    },
                                                ),
                                                b: (msg) => <b>{msg}</b>,
                                            }}
                                        />
                                    </BodyLong>
                                </VStack>

                                <BodyLong>
                                    <FormattedMessage
                                        id="OppsummeringSteg.Periodene"
                                        values={{
                                            hvem: capitalizeFirstLetter(fornavnSøker2Genitiv),
                                            fom: intl.formatDate(planforslag.søker2[0].fom, {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            }),
                                            tom: intl.formatDate(
                                                planforslag.søker2[planforslag.søker2.length - 1].tom,
                                                {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                },
                                            ),
                                            b: (msg) => <b>{msg}</b>,
                                        }}
                                    />
                                </BodyLong>
                            </BluePanel>
                        )}
                        {(erAlenesøker(hvemPlanlegger) || erFarOgFar) && (
                            <BluePanel>
                                <VStack gap="2">
                                    <BodyShort>
                                        <FormattedMessage
                                            id="OppsummeringSteg.DereValgteFedreEllerAlene"
                                            values={{
                                                prosent: hvorLangPeriode.dekningsgrad,
                                                erAlenesøker: erAlenesøker(hvemPlanlegger),
                                                antallUker: ukerOgDagerMedForeldrepenger.uker,
                                                antallDager: ukerOgDagerMedForeldrepenger.dager,
                                            }}
                                        />
                                    </BodyShort>
                                    <BodyShort>
                                        <FormattedMessage
                                            id="OppsummeringSteg.Periode"
                                            values={{
                                                fom: intl.formatDate(planforslag.søker1[0].fom, {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                }),
                                                tom: intl.formatDate(
                                                    planforslag.søker1[planforslag.søker1.length - 1].tom,
                                                    {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    },
                                                ),
                                                b: (msg) => <b>{msg}</b>,
                                            }}
                                        />
                                    </BodyShort>
                                </VStack>
                            </BluePanel>
                        )}
                        {hvemHarRett === 'kunSøker2HarRett' && !erFarOgFar && fornavnSøker2 && (
                            <BluePanel>
                                <VStack gap="2">
                                    <BodyShort>
                                        <FormattedMessage
                                            id="OppsummeringSteg.DereValgteAktivitetskrav"
                                            values={{
                                                uker1: antallUkerOgDagerAktivitetsfriKvote.uker,
                                                dager1: antallUkerOgDagerAktivitetsfriKvote.dager,
                                                uker2:
                                                    getAntallUkerOgDager(valgtStønadskonto).uker -
                                                    antallUkerOgDagerAktivitetsfriKvote.uker,
                                                dager2:
                                                    getAntallUkerOgDager(valgtStønadskonto).dager -
                                                    antallUkerOgDagerAktivitetsfriKvote.dager,
                                                hvem: fornavnSøker1,
                                                prosent: hvorLangPeriode.dekningsgrad,
                                                antallUker: getAntallUkerOgDager(valgtStønadskonto).uker,
                                                dager: getAntallUkerOgDager(valgtStønadskonto).dager,
                                            }}
                                        />
                                    </BodyShort>
                                </VStack>
                            </BluePanel>
                        )}
                        <UttaksplanKalender
                            bareFarMedmorHarRett={bareFarMedmorHarRett}
                            erFarEllerMedmor={erFarEllerMedmor}
                            harAktivitetskravIPeriodeUtenUttak={false}
                            søkersPerioder={tilpassPlan ? søkersPerioder : planforslag.søker1}
                            annenPartsPerioder={tilpassPlan ? annenPartsPerioder : planforslag.søker2}
                            navnAnnenPart="Test"
                            barn={mapOmBarnetTilBarn(barnet)}
                            planleggerLegend={
                                <CalendarLabels
                                    hvemPlanlegger={hvemPlanlegger}
                                    barnet={barnet}
                                    hvemHarRett={hvemHarRett}
                                    uttaksplan={
                                        tilpassPlan
                                            ? gjeldendeUttaksplan
                                            : [...planforslag.søker1, ...planforslag.søker2]
                                    }
                                />
                            }
                            barnehagestartdato={barnehagestartdato}
                        />
                    </VStack>
                </ExpansionCard.Content>
            </ExpansionCard>
        </VStack>
    );
};
