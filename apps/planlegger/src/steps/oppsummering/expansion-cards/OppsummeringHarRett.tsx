import { CalendarIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { barnehagestartDato } from 'steps/barnehageplass/BarnehageplassSteg';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { HvemPlanlegger, HvemPlanleggerType } from 'types/HvemPlanlegger';
import {
    erAlenesøker,
    getEffektivHvemPlanlegger,
    getErFarEllerMedmor,
    getFornavnPåSøker1,
    getFornavnPåSøker2,
    getNavnGenitivEierform,
    getStarterForelder,
} from 'utils/HvemPlanleggerUtils';
import { utledHvemSomHarRett, utledRettighet } from 'utils/hvemHarRettUtils';
import {
    getAntallUkerOgDager,
    getAntallUkerOgDagerAktivitetsfriKvote,
    getAntallUkerOgDagerFellesperiode,
    getUkerOgDager,
} from 'utils/stønadskvoterUtils';
import { loggExpansionCardOpen } from 'utils/umamiUtils';
import { useLagUttaksplanForslag } from 'utils/useLagUttaksplanForslag';
import { finnAntallUkerOgDagerMedForeldrepenger, getAnnenpartsPerioder, getSøkersPerioder } from 'utils/uttakUtils';

import { BodyLong, BodyShort, ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import {
    FordelingPlanlegger,
    HvorLangPeriodePlanlegger,
    KontoBeregningDto,
    OmBarnetPlanlegger,
} from '@navikt/fp-types';
import { BluePanel, IconCircleWrapper } from '@navikt/fp-ui';
import { capitalizeFirstLetter } from '@navikt/fp-utils';
import { UttaksplanDataProvider, UttaksplanKalender } from '@navikt/fp-uttaksplan';

import { ContextDataType, useContextGetData } from '../../../app-data/PlanleggerDataContext';
import { mapOmBarnetPlanleggerTilBarn } from '../../../utils/barnetUtils';

interface Props {
    hvorLangPeriode: HvorLangPeriodePlanlegger;
    valgtStønadskvote: KontoBeregningDto;
    hvemPlanlegger: HvemPlanlegger;
    barnet: OmBarnetPlanlegger;
    arbeidssituasjon: Arbeidssituasjon;
    fordeling?: FordelingPlanlegger;
}

export const OppsummeringHarRett = ({
    valgtStønadskvote,
    hvorLangPeriode,
    hvemPlanlegger,
    barnet,
    arbeidssituasjon,
    fordeling,
}: Props) => {
    const intl = useIntl();

    const uttaksplan = useContextGetData(ContextDataType.UTTAKSPLAN);

    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);

    const antallDagerFellesperiode = getAntallUkerOgDagerFellesperiode(valgtStønadskvote).totaltAntallDager;
    const antallUkerOgDagerFellesperiodeSøker1 = fordeling ? getUkerOgDager(fordeling.antallDagerSøker1) : undefined;
    const antallUkerOgDagerFellesperiodeSøker2 = fordeling
        ? getUkerOgDager(antallDagerFellesperiode - fordeling.antallDagerSøker1)
        : undefined;
    const antallUkerOgDagerAktivitetsfriKvote = getAntallUkerOgDagerAktivitetsfriKvote(valgtStønadskvote);

    const erFarEllerMedmor = getErFarEllerMedmor(hvemPlanlegger, hvemHarRett);

    const erAleneOmOmsorg =
        hvemPlanlegger.type === HvemPlanleggerType.FAR || hvemPlanlegger.type === HvemPlanleggerType.MOR;

    const ukerOgDagerMedForeldrepenger = finnAntallUkerOgDagerMedForeldrepenger(valgtStønadskvote);

    const erFarOgFar = hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR;
    // For visning av navn sammen med perioder/fellesperiodedager i oppsummeringen brukes effektiv rekkefølge, slik at
    // «søker1» er den valgte starteren (samsvarer med fordeling.antallDagerSøker1 og søker1Plan). Til rollebaserte
    // kvotenavn i KvoteOppsummering (mor/farMedmor) brukes derimot rådata lenger ned, siden rollen er fast.
    const effektivHvemPlanlegger = getEffektivHvemPlanlegger(hvemPlanlegger, fordeling, barnet, intl);
    const fornavnSøker1 = getFornavnPåSøker1(effektivHvemPlanlegger, intl);
    const fornavnSøker1Genitiv = getNavnGenitivEierform(fornavnSøker1, intl.locale);
    const fornavnSøker2 = getFornavnPåSøker2(effektivHvemPlanlegger, intl);
    const fornavnSøker2Genitiv = fornavnSøker2 ? getNavnGenitivEierform(fornavnSøker2, intl.locale) : undefined;

    const barnehagestartdato = barnehagestartDato(barnet);

    const erDeltUttak = fordeling !== undefined;
    const starterForelder = getStarterForelder(hvemPlanlegger, fordeling, barnet);

    const planforslag = useLagUttaksplanForslag(valgtStønadskvote);

    const søker1Plan = uttaksplan
        ? getSøkersPerioder(erDeltUttak, uttaksplan, erFarEllerMedmor, starterForelder)
        : planforslag.søker1;
    const søker2Plan = uttaksplan
        ? getAnnenpartsPerioder(erDeltUttak, uttaksplan, erFarEllerMedmor, starterForelder)
        : planforslag.søker2;

    return (
        <VStack gap="space-40">
            <ExpansionCard aria-label="" onToggle={loggExpansionCardOpen('toggle-oppgitt-informasjon')} size="small">
                <ExpansionCard.Header>
                    <HStack gap="space-24" align="center" wrap={false}>
                        <IconCircleWrapper size="medium" color="lightBlue">
                            <CalendarIcon height={24} width={24} fontSize="1.5rem" aria-hidden />
                        </IconCircleWrapper>
                        <ExpansionCard.Title size="small">
                            <FormattedMessage
                                id="OppsummeringHarRett.Tittel"
                                values={{ erAlenesøker: erAlenesøker(hvemPlanlegger) }}
                            />
                        </ExpansionCard.Title>
                    </HStack>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <VStack gap="space-20">
                        {hvemHarRett === 'beggeHarRett' && !erFarOgFar && fornavnSøker2 && fornavnSøker2Genitiv && (
                            <BluePanel>
                                <VStack gap="space-8">
                                    <BodyLong>
                                        <FormattedMessage
                                            id="OppsummeringSteg.DereValgte"
                                            values={{
                                                prosent: hvorLangPeriode.dekningsgrad,
                                                antallUker: ukerOgDagerMedForeldrepenger.uker,
                                                antallDager: ukerOgDagerMedForeldrepenger.dager,
                                                hvem: fornavnSøker1,
                                                hvem2: fornavnSøker2,
                                                uker: antallUkerOgDagerFellesperiodeSøker1?.uker || 0,
                                                dager: antallUkerOgDagerFellesperiodeSøker1?.dager || 0,
                                                uker2: antallUkerOgDagerFellesperiodeSøker2?.uker || 0,
                                                dager2: antallUkerOgDagerFellesperiodeSøker2?.dager || 0,
                                            }}
                                        />
                                    </BodyLong>

                                    {søker1Plan.length > 0 && (
                                        <BodyLong>
                                            <FormattedMessage
                                                id="OppsummeringSteg.Periodene"
                                                values={{
                                                    hvem: capitalizeFirstLetter(fornavnSøker1Genitiv),
                                                    fom: intl.formatDate(søker1Plan[0]!.fom, {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }),
                                                    tom: intl.formatDate(søker1Plan.at(-1)!.tom, {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }),
                                                    b: (msg) => <b>{msg}</b>,
                                                }}
                                            />
                                        </BodyLong>
                                    )}
                                </VStack>

                                <>
                                    {søker2Plan.length > 0 && (
                                        <BodyLong>
                                            <FormattedMessage
                                                id="OppsummeringSteg.Periodene"
                                                values={{
                                                    hvem: capitalizeFirstLetter(fornavnSøker2Genitiv),
                                                    fom: intl.formatDate(søker2Plan[0]!.fom, {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }),
                                                    tom: intl.formatDate(søker2Plan.at(-1)!.tom, {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }),
                                                    b: (msg) => <b>{msg}</b>,
                                                }}
                                            />
                                        </BodyLong>
                                    )}
                                </>
                            </BluePanel>
                        )}
                        {(erAlenesøker(hvemPlanlegger) || erFarOgFar) && (
                            <BluePanel>
                                <VStack gap="space-8">
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
                                    {søker1Plan.length > 0 && (
                                        <BodyShort>
                                            <FormattedMessage
                                                id="OppsummeringSteg.Periode"
                                                values={{
                                                    fom: intl.formatDate(søker1Plan[0]!.fom, {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }),
                                                    tom: intl.formatDate(søker1Plan.at(-1)!.tom, {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }),
                                                    b: (msg) => <b>{msg}</b>,
                                                }}
                                            />
                                        </BodyShort>
                                    )}
                                </VStack>
                            </BluePanel>
                        )}
                        {hvemHarRett === 'kunSøker2HarRett' && !erFarOgFar && fornavnSøker2 && (
                            <BluePanel>
                                <VStack gap="space-8">
                                    <BodyShort>
                                        <FormattedMessage
                                            id="OppsummeringSteg.DereValgteAktivitetskrav"
                                            values={{
                                                uker1: antallUkerOgDagerAktivitetsfriKvote.uker,
                                                dager1: antallUkerOgDagerAktivitetsfriKvote.dager,
                                                uker2:
                                                    getAntallUkerOgDager(valgtStønadskvote).uker -
                                                    antallUkerOgDagerAktivitetsfriKvote.uker,
                                                dager2:
                                                    getAntallUkerOgDager(valgtStønadskvote).dager -
                                                    antallUkerOgDagerAktivitetsfriKvote.dager,
                                                hvem: fornavnSøker1,
                                                prosent: hvorLangPeriode.dekningsgrad,
                                                antallUker: getAntallUkerOgDager(valgtStønadskvote).uker,
                                                dager: getAntallUkerOgDager(valgtStønadskvote).dager,
                                            }}
                                        />
                                    </BodyShort>
                                </VStack>
                            </BluePanel>
                        )}
                        <UttaksplanDataProvider
                            barn={mapOmBarnetPlanleggerTilBarn(barnet)}
                            foreldreInfo={{
                                søker: erFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR',
                                navnPåForeldre: {
                                    mor: getFornavnPåSøker1(hvemPlanlegger, intl),
                                    farMedmor: getFornavnPåSøker2(hvemPlanlegger, intl) || '',
                                },
                                rettighetType: utledRettighet(erAleneOmOmsorg, erDeltUttak),
                                erMedmorDelAvSøknaden: hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR,
                                erIkkeSøkerSpesifisert: erDeltUttak,
                                erFarOgFar,
                            }}
                            valgtStønadskvote={valgtStønadskvote}
                            harAktivitetskravIPeriodeUtenUttak={false}
                            uttakPerioder={uttaksplan ?? [...planforslag.søker1, ...planforslag.søker2]}
                            erPeriodeneTilAnnenPartLåst={false}
                            erEndringssøknad={false}
                        >
                            <UttaksplanKalender barnehagestartdato={barnehagestartdato} readOnly />
                        </UttaksplanDataProvider>
                    </VStack>
                </ExpansionCard.Content>
            </ExpansionCard>
        </VStack>
    );
};
